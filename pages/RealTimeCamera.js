import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';

const RealTimeCamera = ({ navigation }) => {
  const [cameraOpen, setCameraOpen] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const openCamera = async () => {
    try {
      if (hasPermission) {
        setCameraOpen(true);
      } else {
        alert('Camera permission is required to use this feature.');
      }
    } catch (error) {
      console.error('Error opening camera:', error);
      alert('Failed to open camera. Please try again.');
    }
  };

  if (hasPermission === null) {
    return <View style={styles.container}><Text>Requesting camera permission...</Text></View>;
  }

  if (hasPermission === false) {
    return <View style={styles.container}><Text>No access to camera</Text></View>;
  }

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
          <View style={styles.buttonContainer}>
            <Button title="Open Camera" onPress={openCamera} color="#4CAF50" />
            <View style={styles.buttonSpacer} />
            <Button title="Go Back" onPress={() => navigation.goBack()} color="#2196F3" />
          </View>
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
    backgroundColor: '#E0F7FA',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#00796B',
  },
  description: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 30,
    color: '#004D40',
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
    backgroundColor: '#FF5252',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    fontSize: 16,
    color: 'white',
  },
  buttonContainer: {
    width: '100%',
    paddingHorizontal: 20,
  },
  buttonSpacer: {
    height: 10,
  },
});

export default RealTimeCamera;