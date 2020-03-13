import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MapScreen from '../screens/map';
import InfoScreen from '../screens/info';
import AccountStack from './AccountStack';

const BTab = createBottomTabNavigator();

export default function BottomTab() {
  return (
    <BTab.Navigator initialRouteName='MapScreen'>
      <BTab.Screen name='MapScreen' component={MapScreen} />
      <BTab.Screen name='InfoScreen' component={InfoScreen} />
      <BTab.Screen name='AccountStack' component={AccountStack} />
    </BTab.Navigator>
  );
}
