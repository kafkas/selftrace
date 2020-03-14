import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from '../../components/Icon';
import MapScreen from '../../screens/map';
import FormScreen from '../../screens/form';
import AccountStack from './AccountStack';
// import AnimatedTouchable from './AnimatedTouchable';

const BTab = createBottomTabNavigator();

export default function BottomTab() {
  return (
    <BTab.Navigator
      initialRouteName='FormScreen'
      tabBarOptions={{ showLabel: false }}
      screenOptions={{ title: 'ass' }}
    >
      <BTab.Screen
        name='FormScreen'
        component={FormScreen}
        options={{
          tabBarIcon: ({ color }: { color: string }) => (
            <Icon name='form' size={25} color={color} />
          ),
        }}
      />
      <BTab.Screen
        name='MapScreen'
        component={MapScreen}
        options={{
          tabBarIcon: ({ color }: { color: string }) => (
            <Icon name='map-marker-multiple' size={25} color={color} />
          ),
        }}
      />
      <BTab.Screen
        name='AccountStack'
        component={AccountStack}
        options={{
          tabBarIcon: ({ color }: { color: string }) => (
            <Icon name='person' size={25} color={color} />
          ),
        }}
      />
    </BTab.Navigator>
  );
}
