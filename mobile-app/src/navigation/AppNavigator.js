import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import HomeScreen from '../screens/HomeScreen';
import FormsListScreen from '../screens/FormsListScreen';
import FormDetailScreen from '../screens/FormDetailScreen';
import OnlineFormScreen from '../screens/OnlineFormScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Auth" component={LoginScreen} />
        <Stack.Screen
          name="Signup"
          component={SignupScreen}
          options={{ headerShown: true, title: 'Create Account' }}
        />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="FormsList" component={FormsListScreen} />
        <Stack.Screen name="FormDetail" component={FormDetailScreen} />
        <Stack.Screen name="OnlineForm" component={OnlineFormScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
