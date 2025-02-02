import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';  // Importing navigation

const Home = () => {
  const navigation = useNavigation();  // Hook for navigation

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Garbage Detection App</Text>
      
      {/* Real-Time Camera Garbage Detection Button */}
      <View style={styles.buttonContainer}>
        <Button
          title="Real-Time Camera Garbage Detection"
          onPress={() => navigation.navigate('RealTimeCamera')}
        />
      </View>

      {/* Upload Image for Garbage Detection Button */}
      <View style={styles.buttonContainer}>
        <Button
          title="Upload Image for Garbage Detection"
          onPress={() => navigation.navigate('UploadImage')}
        />
      </View>
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
  buttonContainer: {
    width: '100%',
    marginVertical: 10,
  },
});

export default Home;
