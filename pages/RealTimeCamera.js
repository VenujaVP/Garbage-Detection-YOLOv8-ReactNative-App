import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { CameraView, Camera } from "expo-camera";
import { useNavigation } from "@react-navigation/native";

export default function RealTimeCamera() {
  const [cameraPermission, setCameraPermission] = useState(null); // State for camera permission
  const navigation = useNavigation();

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

  // Function to process video frames (you can add your detection logic here)
  const handleFrame = ({ nativeEvent }) => {
    const frame = nativeEvent; // This contains the video frame data
    console.log("Frame data:", frame);
    // Add your garbage detection logic here
  };

  return (
    <SafeAreaView style={styles.container}>
      <CameraView
        style={styles.camera}
        onCameraReady={() => console.log("Camera is ready")}
        onFrameAvailable={handleFrame} // Process video frames in real-time
      >
        <View style={styles.overlay}>
          <Text style={styles.overlayText}>Real-Time Garbage Detection</Text>
        </View>
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
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 20,
    alignItems: "center",
  },
  overlayText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});