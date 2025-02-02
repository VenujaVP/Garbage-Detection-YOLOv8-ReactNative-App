// expo install expo-camera expo-image-picker
// expo install expo-camera expo-image-picker
// npm install @react-navigation/native @react-navigation/stack react-native-screens react-native-safe-area-context
// npm install expo-camera



import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import RealTimeCamera from './pages/RealTimeCamera';
import SplashScreen from "./pages/SplashScreen";
import Home from "./pages/Home";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }}/>
        <Stack.Screen name="RealTimeCamera" component={RealTimeCamera} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}



