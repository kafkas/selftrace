import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from '../../components/Icon';
import MapScreen from '../../screens/map';
import AccountStack from './AccountStack';
import FormStack from './FormStack';
import { PRIMARY_COLOR, INACTIVE_ICON_COLOR } from '../../styles/colors';

const BTab = createBottomTabNavigator();

export default function BottomTab() {
  return (
    <BTab.Navigator
      initialRouteName='FormStack'
      tabBarOptions={{ showLabel: false }}
    >
      <BTab.Screen
        name='FormStack'
        component={FormStack}
        options={{
          tabBarIcon: ({ focused }: { color: string }) => (
            <Icon
              name='form'
              size={25}
              color={
                focused
                  ? PRIMARY_COLOR.toString()
                  : INACTIVE_ICON_COLOR.toString()
              }
            />
          ),
        }}
      />
      <BTab.Screen
        name='MapScreen'
        component={MapScreen}
        options={{
          tabBarIcon: ({ focused }: { color: string }) => (
            <Icon
              name='map-marker-multiple'
              size={25}
              color={
                focused
                  ? PRIMARY_COLOR.toString()
                  : INACTIVE_ICON_COLOR.toString()
              }
            />
          ),
        }}
      />
      <BTab.Screen
        name='AccountStack'
        component={AccountStack}
        options={{
          tabBarIcon: ({ focused }: { color: string }) => (
            <Icon
              name='person'
              size={25}
              color={
                focused
                  ? PRIMARY_COLOR.toString()
                  : INACTIVE_ICON_COLOR.toString()
              }
            />
          ),
        }}
      />
    </BTab.Navigator>
  );
}
