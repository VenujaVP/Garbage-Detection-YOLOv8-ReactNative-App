import React from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';  // Importing navigation
import { SafeAreaView } from 'react-native';  // Safe area wrapper to prevent clipping

const Home = () => {
  const navigation = useNavigation();  // Hook for navigation

  return (
    <SafeAreaView style={styles.container}>
      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Main Content */}
        <View style={styles.mainContent}>
          <Text style={styles.title}>Welcome to Garbage Detection App</Text>

          <Text style={styles.introText}>
            Our app helps in detecting and classifying garbage using real-time camera feed or uploaded images.
          </Text>

          {/* Real-Time Camera Garbage Detection Section */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>1. Real-Time Camera Garbage Detection</Text>
            <Text style={styles.sectionDescription}>
              Use your device's camera to detect garbage in real-time. The model will show the detection results directly on the camera feed.
            </Text>
            <Button
              title="Start Real-Time Camera Detection"
              onPress={() => navigation.navigate('RealTimeCamera')}
            />
          </View>

          {/* Upload Image for Garbage Detection Section */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>2. Upload Image for Garbage Detection</Text>
            <Text style={styles.sectionDescription}>
              Upload an image to detect garbage. The model will process the image and display the result with garbage labeled.
            </Text>
            <Button
              title="Upload Image for Garbage Detection"
              onPress={() => navigation.navigate('UploadImage')}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    marginTop: 30,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  mainContent: {
    width: '100%',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  introText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  sectionContainer: {
    width: '100%',
    marginVertical: 20,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  sectionDescription: {
    fontSize: 16,
    marginBottom: 15,
  },
});

export default Home;