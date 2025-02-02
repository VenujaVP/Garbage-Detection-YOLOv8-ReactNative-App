//ClassificationImage,js
import React, { useState } from "react";
import { View, Text, Button, StyleSheet, Image, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";

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

  // Simulate garbage detection (no model logic)
  const detectGarbage = () => {
    if (!image) {
      Alert.alert("No image", "Please upload an image first.");
      return;
    }

    setLoading(true);

    // Simulate a delay for processing
    setTimeout(() => {
      setResult("Organic Waste"); // Example result
      setLoading(false);
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upload Image for Garbage Detection</Text>
      <Text style={styles.introText}>
        Upload an image to detect and classify garbage using our AI model.
      </Text>

      {/* Image Upload Section */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>1. Upload Image</Text>
        <Text style={styles.sectionDescription}>
          Select an image from your gallery to upload.
        </Text>
        <Button title="Upload Image" onPress={pickImage} />
        {image && <Image source={{ uri: image }} style={styles.imagePreview} />}
      </View>

      {/* Detection Section */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>2. Detect Garbage</Text>
        <Text style={styles.sectionDescription}>
          Click the button below to detect garbage in the uploaded image.
        </Text>
        <Button
          title={loading ? "Processing..." : "Detect Garbage"}
          onPress={detectGarbage}
          disabled={loading}
        />
        {result !== null && (
          <Text style={styles.resultText}>Detection Result: {result}</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E0F7FA", // Light blue background
    paddingTop: 50,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#00796B", // Dark teal color
  },
  introText: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 5,
    paddingHorizontal: 5,
    color: "#004D40", // Darker teal color
  },
  sectionContainer: {
    width: "100%",
    marginVertical: 10,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#00796B", // Dark teal color
  },
  sectionDescription: {
    fontSize: 16,
    marginBottom: 15,
    color: "#004D40", // Darker teal color
  },
  imagePreview: {
    width: "100%",
    height: 200,
    marginTop: 10,
    borderRadius: 8,
  },
  resultText: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    color: "#00796B", // Dark teal color
    textAlign: "center",
  },
});

export default ClassificationImage;