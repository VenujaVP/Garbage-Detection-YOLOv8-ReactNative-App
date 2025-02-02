import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';

const RealTimeCamera = ({ navigation }) => {
  const [cameraOpen, setCameraOpen] = useState(false);

  const openCamera = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    if (status === 'granted') {
      setCameraOpen(true);
    } else {
      alert('Camera permission is required to use this feature.');
    }
  };

  return (
    <View style={styles.container}>
      {cameraOpen ? (
        <Camera style={styles.camera} type={Camera.Constants.Type.back}>
          <View style={styles.cameraContainer}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setCameraOpen(false)}
            >
              <Text style={styles.closeButtonText}>Close Camera</Text>
            </TouchableOpacity>
          </View>
        </Camera>
      ) : (
        <>
          <Text style={styles.title}>Real-Time Camera Garbage Detection</Text>
          <Text style={styles.description}>
            Use the camera to detect garbage in real-time.
          </Text>
          <Button title="Open Camera" onPress={openCamera} />
          <Button title="Go Back" onPress={() => navigation.goBack()} />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  description: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 30,
  },
  camera: {
    flex: 1,
    width: '100%',
  },
  cameraContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 20,
  },
  closeButton: {
    alignSelf: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    fontSize: 16,
    color: 'white',
  },
});

export default RealTimeCamera;