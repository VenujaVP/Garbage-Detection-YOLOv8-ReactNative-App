import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { CameraView, Camera } from "expo-camera";
import axios from "axios";

export default function RealTimeCamera() {
  const [cameraPermission, setCameraPermission] = useState(null); // State for camera permission
  const [detections, setDetections] = useState([]); // State for detection results
  const cameraRef = useRef(null); // Ref for the camera component

  // Request camera permissions when the component mounts
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setCameraPermission(status === "granted");
    })();
  }, []);

  // Handle permission states
  if (cameraPermission === null) {
    return <Text>Requesting camera permission...</Text>;
  } else if (!cameraPermission) {
    return (
      <Text>
        Permission for camera not granted. Please enable it in settings.
      </Text>
    );
  }

  // Function to process video frames
  const handleFrame = async ({ nativeEvent }) => {
    const frame = nativeEvent; // This contains the video frame data

    try {
      // Convert the frame to a base64 image
      const base64Image = `data:image/jpeg;base64,${frame.base64}`;

      // Send the frame to the backend for processing
      const response = await axios.post("http://192.168.43.73:5000/predict", {
        image: base64Image,
      });

      // Update the detections state with the results
      setDetections(response.data.detections);
    } catch (error) {
      console.error("Error processing frame:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <CameraView
        ref={cameraRef}
        style={styles.camera}
        onCameraReady={() => console.log("Camera is ready")}
        onFrameAvailable={handleFrame} // Process video frames in real-time
      >
        {/* Overlay detection results on the camera feed */}
        {detections.map((detection, index) => (
          <View
            key={index}
            style={{
              position: "absolute",
              borderWidth: 2,
              borderColor: "red",
              left: detection.bbox[0],
              top: detection.bbox[1],
              width: detection.bbox[2] - detection.bbox[0],
              height: detection.bbox[3] - detection.bbox[1],
            }}
          >
            <Text style={{ color: "white", backgroundColor: "red" }}>
              {detection.class} ({detection.confidence.toFixed(2)})
            </Text>
          </View>
        ))}
      </CameraView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  camera: {
    flex: 1,
  },
});