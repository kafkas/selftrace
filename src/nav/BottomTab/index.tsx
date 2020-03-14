import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from '../../components/Icon';
import MapScreen from '../../screens/map';
import InfoScreen from '../../screens/info';
import AccountStack from './AccountStack';
// import AnimatedTouchable from './AnimatedTouchable';

const BTab = createBottomTabNavigator();

export default function BottomTab() {
  return (
    <BTab.Navigator
      initialRouteName='InfoScreen'
      tabBarOptions={{ showLabel: false }}
    >
      <BTab.Screen
        name='InfoScreen'
        component={InfoScreen}
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
