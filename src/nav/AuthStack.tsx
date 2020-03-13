import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AuthScreen from '../screens/auth';
import PasswordResetScreen from '../screens/password-reset';

const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator initialRouteName='AuthScreen'>
      <Stack.Screen
        name='AuthScreen'
        component={AuthScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='PasswordResetScreen'
        component={PasswordResetScreen}
      />
    </Stack.Navigator>
  );
}
