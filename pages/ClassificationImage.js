import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  Alert,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";

const ClassificationImage = () => {
  const [image, setImage] = useState(null); // State for uploaded image
  const [result, setResult] = useState(null); // State for detection result
  const [loading, setLoading] = useState(false); // State for loading indicator

  // Handle image upload
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission required", "Please allow access to your photo library to upload images.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri); // Set the uploaded image URI
      setResult(null); // Reset previous result
    }
  };

  // Send image to backend for prediction
  const detectGarbage = async () => {
    if (!image) {
      Alert.alert("No image", "Please upload an image first.");
      return;
    }

    setLoading(true);

    // Convert image URI to a file object
    const formData = new FormData();
    formData.append("file", {
      uri: image,
      name: "photo.jpg",
      type: "image/jpeg",
    });

    try {
      const response = await axios.post("http://192.168.43.73:5000/predict", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const { detections, output_image } = response.data;

      // Convert hex string back to image
      const outputImageBytes = new Uint8Array(Buffer.from(output_image, "hex"));
      const outputImageUri = `data:image/jpeg;base64,${Buffer.from(outputImageBytes).toString("base64")}`;

      setResult({
        detections,
        outputImageUri,
      });
    } catch (error) {
      console.error("Error:", error);
      Alert.alert("Error", "Failed to process the image.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Top Section: Image Area */}
      <ScrollView contentContainerStyle={styles.imageArea}>
        {image ? (
          <Image source={{ uri: image }} style={styles.imagePreview} />
        ) : (
          <TouchableOpacity onPress={pickImage} style={styles.uploadArea}>
            <Text style={styles.uploadText}>Upload Image</Text>
          </TouchableOpacity>
        )}
      </ScrollView>

      {/* Detect Button */}
      <View style={styles.buttonContainer}>
        <Button
          title={loading ? "Processing..." : "Detect Garbage"}
          onPress={detectGarbage}
          disabled={loading}
          color="#00796B" // Dark teal color for the button
        />
      </View>

      {/* Result Section */}
      {result !== null && (
        <View style={styles.resultSection}>
          <Text style={styles.resultText}>Detection Results:</Text>
          {result.detections.map((detection, index) => (
            <Text key={index} style={styles.resultText}>
              {detection.class} (Confidence: {detection.confidence.toFixed(2)})
            </Text>
          ))}
          <Image source={{ uri: result.outputImageUri }} style={styles.outputImage} />
        </View>
      )}
    </View>
  );
};

// Styles remain the same as before
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E0F7FA", // Light blue background
    paddingTop: 20,
  },
  imageArea: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff", // White background for image area
    margin: 20,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  uploadArea: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 300,
  },
  uploadText: {
    fontSize: 18,
    color: "#00796B", // Dark teal color
  },
  imagePreview: {
    width: "100%",
    height: 300,
    borderRadius: 8,
  },
  buttonContainer: {
    margin: 20,
  },
  resultSection: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    padding: 15,
    margin: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  resultText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "#00796B", // Dark teal color
  },
  outputImage: {
    width: "100%",
    height: 300,
    borderRadius: 8,
    marginTop: 10,
  },
});

export default ClassificationImage;