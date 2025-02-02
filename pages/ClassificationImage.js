import React, { useState } from "react";
import { View, Text, Button, StyleSheet, Image, Alert, ScrollView } from "react-native";
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
      {/* Top Section: Image Area */}
      <ScrollView contentContainerStyle={styles.imageArea}>
        {image ? (
          <Image source={{ uri: image }} style={styles.imagePreview} />
        ) : (
          <Text style={styles.uploadText}>Upload Image</Text>
        )}
      </ScrollView>

      {/* Middle Section: "DECTED" Bar */}
      <View style={styles.dectedBar}>
        <Text style={styles.dectedText}>DECTED</Text>
      </View>

      {/* Detect Button */}
      <View style={styles.buttonContainer}>
        <Button
          title={loading ? "Processing..." : "Detect Garbage"}
          onPress={detectGarbage}
          disabled={loading}
        />
      </View>

      {/* Result Section */}
      {result !== null && (
        <View style={styles.resultSection}>
          <Text style={styles.resultText}>Detection Result: {result}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E0F7FA", // Light blue background
  },
  imageArea: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff", // White background for image area
    margin: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
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
  dectedBar: {
    backgroundColor: "#00796B", // Dark teal color
    padding: 10,
    alignItems: "center",
  },
  dectedText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ffffff", // White text
  },
  buttonContainer: {
    margin: 20,
  },
  resultSection: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    padding: 15,
    margin: 10,
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
});

export default ClassificationImage;