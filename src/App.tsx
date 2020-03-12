import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import InfoScreen from './screens/info';
import MapScreen from './screens/map';

const BottomTab = createBottomTabNavigator();

function App() {
  return (
    <NavigationContainer>
      <BottomTab.Navigator>
        <BottomTab.Screen name='Map' component={MapScreen} />
        <BottomTab.Screen name='Info' component={InfoScreen} />
      </BottomTab.Navigator>
    </NavigationContainer>
  );
}

export default App;
