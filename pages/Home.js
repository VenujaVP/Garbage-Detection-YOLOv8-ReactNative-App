import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';  // Navigation if needed

const Home = () => {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [imageUri, setImageUri] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      // Request permission for camera
      const { status } = await Camera.requestPermissionsAsync();
      setHasCameraPermission(status === 'granted');
      // Request permission for image picker
      const imagePickerPermission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    })();
  }, []);

  const handleUploadImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImageUri(result.uri);
      // Call model for image classification here
    }
  };

  const handleStartDetection = () => {
    setLoading(true);
    // Call model for real-time camera garbage detection here
  };

  if (hasCameraPermission === null) {
    return <Text>Requesting camera permission...</Text>;
  }

  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      {/* Section 1: Real-Time Camera Garbage Detection */}
      <View style={styles.section}>
        <Text style={styles.title}>Real-Time Garbage Detection</Text>
        <Text style={styles.description}>
          Use the camera to detect garbage in real-time and receive instant feedback on waste detection.
        </Text>
        <View style={styles.cameraContainer}>
          <Camera 
            style={styles.camera} 
            type={Camera.Constants.Type.back} 
            ref={ref => setCamera(ref)}
          >
            <View style={styles.cameraButtonContainer}>
              <Button title={loading ? 'Detecting...' : 'Start Detection'} onPress={handleStartDetection} disabled={loading} />
            </View>
          </Camera>
        </View>
      </View>

      {/* Section 2: Upload Image for Garbage Detection */}
      <View style={styles.section}>
        <Text style={styles.title}>Upload Image for Garbage Detection</Text>
        <Text style={styles.description}>
          Upload an image to detect garbage and classify the content using the trained model.
        </Text>
        <TouchableOpacity style={styles.uploadButton} onPress={handleUploadImage}>
          <Text style={styles.uploadText}>Choose Image</Text>
        </TouchableOpacity>
        {imageUri && <Image source={{ uri: imageUri }} style={styles.uploadedImage} />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-around',
  },
  section: {
    marginBottom: 30,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 15,
  },
  cameraContainer: {
    width: '100%',
    height: 300,
    borderRadius: 15,
    overflow: 'hidden',
  },
  camera: {
    flex: 1,
  },
  cameraButtonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 20,
  },
  uploadButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  uploadText: {
    color: 'white',
    fontSize: 18,
  },
  uploadedImage: {
    marginTop: 20,
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    borderRadius: 10,
  },
});

export default Home;
