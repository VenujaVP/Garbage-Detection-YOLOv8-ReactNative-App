import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';

// Placeholder for camera feed or detection area
const DetectionSection = ({ onStartDetection, label }) => {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{label}</Text>
      <TouchableOpacity style={styles.button} onPress={onStartDetection}>
        <Text style={styles.buttonText}>Start {label}</Text>
      </TouchableOpacity>
    </View>
  );
};

const Home = () => {
  const [isDetectionActive, setIsDetectionActive] = useState(false);
  const [isClassificationActive, setIsClassificationActive] = useState(false);

  // Handle the start of detection or classification
  const handleStartDetection = () => {
    // Add logic to activate real-time detection (camera + model)
    setIsDetectionActive(true);
    console.log("Starting garbage detection...");
  };

  const handleStartClassification = () => {
    // Add logic to activate real-time classification (camera + model)
    setIsClassificationActive(true);
    console.log("Starting classification...");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Garbage Detection & Classification</Text>

      {/* Detection Section */}
      <DetectionSection
        label="Real-Time Detection"
        onStartDetection={handleStartDetection}
      />

      {/* Classification Section */}
      <DetectionSection
        label="Garbage Classification"
        onStartDetection={handleStartClassification}
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
});

export default Home;
