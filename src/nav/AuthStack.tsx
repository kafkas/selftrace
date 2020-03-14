import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AuthScreen from '../screens/auth';
import PasswordResetScreen from '../screens/password-reset';
import { StackScreenOptions } from './config';

const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator
      initialRouteName='AuthScreen'
      screenOptions={StackScreenOptions}
    >
      <Stack.Screen
        name='AuthScreen'
        component={AuthScreen}
        options={{ ...StackScreenOptions, headerShown: false }}
      />
      <Stack.Screen
        name='PasswordResetScreen'
        component={PasswordResetScreen}
        options={...StackScreenOptions}
      />
    </Stack.Navigator>
  );
}
