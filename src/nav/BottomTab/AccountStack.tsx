import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AccountScreen from '../../screens/account';
import ProfileScreen from '../../screens/profile';
import PasswordUpdateScreen from '../../screens/password-update';
import { StackScreenOptions } from '../config';

const Stack = createStackNavigator();

export default function AccountStack() {
  return (
    <Stack.Navigator
      initialRouteName='AccountScreen'
      screenOptions={StackScreenOptions}
    >
      <Stack.Screen
        name='AccountScreen'
        component={AccountScreen}
        options={{
          ...StackScreenOptions,
          headerTitle: 'Account',
        }}
      />
      <Stack.Screen
        name='ProfileScreen'
        component={ProfileScreen}
        options={{
          ...StackScreenOptions,
          headerTitle: 'Profile',
        }}
      />
      <Stack.Screen
        name='PasswordUpdateScreen'
        component={PasswordUpdateScreen}
        options={{
          ...StackScreenOptions,
          headerTitle: 'Update password',
        }}
      />
    </Stack.Navigator>
  );
}
