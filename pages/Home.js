import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker'; // For image picker to upload image

// Placeholder for camera feed or detection area
const DetectionSection = ({ onStartDetection, label, description }) => {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{label}</Text>
      <Text style={styles.description}>{description}</Text>
      <TouchableOpacity style={styles.button} onPress={onStartDetection}>
        <Text style={styles.buttonText}>Start {label}</Text>
      </TouchableOpacity>
    </View>
  );
};

const ImageUploadSection = ({ onSelectImage, resultImage, resultText }) => {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Upload Image for Classification</Text>
      <Text style={styles.description}>
        Upload an image, and the model will classify whether it contains garbage or not.
      </Text>
      <TouchableOpacity style={styles.button} onPress={onSelectImage}>
        <Text style={styles.buttonText}>Select Image</Text>
      </TouchableOpacity>
      {resultImage && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>{resultText}</Text>
          <Image source={{ uri: resultImage }} style={styles.resultImage} />
        </View>
      )}
    </View>
  );
};

const Home = () => {
  const [isDetectionActive, setIsDetectionActive] = useState(false);
  const [resultImage, setResultImage] = useState(null);
  const [resultText, setResultText] = useState('');

  // Handle the start of real-time detection
  const handleStartDetection = () => {
    // Add logic to activate real-time detection (camera + model)
    setIsDetectionActive(true);
    console.log("Starting real-time garbage detection...");
  };

  // Handle image selection and classification
  const handleSelectImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      // Call model to classify the uploaded image
      console.log("Image selected: ", result.assets[0].uri);
      setResultImage(result.assets[0].uri);
      setResultText('Classified as: Garbage Detected'); // Replace with actual model result
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Garbage Detection & Classification</Text>

      {/* Real-Time Detection Section */}
      <DetectionSection
        label="Real-Time Garbage Detection"
        description="Activate your camera to detect garbage in real-time. The model will identify and mark garbage objects."
        onStartDetection={handleStartDetection}
      />

      {/* Image Upload and Classification Section */}
      <ImageUploadSection
        onSelectImage={handleSelectImage}
        resultImage={resultImage}
        resultText={resultText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  section: {
    width: '100%',
    padding: 15,
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: '#555',
    marginBottom: 15,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#1E90FF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  resultContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  resultText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  resultImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
});

export default Home;
