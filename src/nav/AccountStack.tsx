import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AccountScreen from '../screens/account';
import ProfileScreen from '../screens/profile';
import PasswordUpdateScreen from '../screens/password-update';

const Stack = createStackNavigator();

export default function AccountStack() {
  return (
    <Stack.Navigator initialRouteName='AccountScreen'>
      <Stack.Screen name='AccountScreen' component={AccountScreen} />
      <Stack.Screen name='ProfileScreen' component={ProfileScreen} />
      <Stack.Screen
        name='PasswordUpdateScreen'
        component={PasswordUpdateScreen}
      />
    </Stack.Navigator>
  );
}
