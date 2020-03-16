import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import i18n from 'i18n-js';
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
          headerTitle: i18n.t('headers.account'),
        }}
      />
      <Stack.Screen
        name='ProfileScreen'
        component={ProfileScreen}
        options={{
          ...StackScreenOptions,
          headerTitle: i18n.t('headers.profile'),
        }}
      />
      <Stack.Screen
        name='PasswordUpdateScreen'
        component={PasswordUpdateScreen}
        options={{
          ...StackScreenOptions,
          headerTitle: i18n.t('headers.updatePassword'),
        }}
      />
    </Stack.Navigator>
  );
}
