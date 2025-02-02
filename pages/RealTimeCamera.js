import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const RealTimeCamera = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Real-Time Camera Garbage Detection</Text>
      <Text style={styles.description}>
        Use the camera to detect garbage in real-time.
      </Text>
      
      {/* Add Camera feed and detection logic here */}

      <Button title="Go Back" onPress={() => navigation.goBack()} />
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
});

export default RealTimeCamera;
