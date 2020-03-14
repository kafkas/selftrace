import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import FormScreen from '../../screens/form';
import { StackScreenOptions } from '../config';

const Stack = createStackNavigator();

export default function FormStack() {
  return (
    <Stack.Navigator
      initialRouteName='FormScreen'
      screenOptions={StackScreenOptions}
    >
      <Stack.Screen
        name='FormScreen'
        component={FormScreen}
        options={{
          ...StackScreenOptions,
          headerTitle: 'Form',
        }}
      />
    </Stack.Navigator>
  );
}
