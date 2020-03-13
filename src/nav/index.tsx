import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import AuthScreen from '../screens/auth';
import InfoScreen from '../screens/info';
import MapScreen from '../screens/map';
import PasswordResetScreen from '../screens/password-reset';
import SplashScreen from '../screens/splash';
import { AuthStatus } from '../data-types';

const BottomTab = createBottomTabNavigator();
const AuthStack = createStackNavigator();

interface Props {
  authStatus: AuthStatus;
}

export default function Layout({ authStatus }: Props) {
  if (authStatus === AuthStatus.Checking) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      {authStatus === AuthStatus.SignedIn ? (
        <BottomTab.Navigator initialRouteName='MapScreen'>
          <BottomTab.Screen name='MapScreen' component={MapScreen} />
          <BottomTab.Screen name='InfoScreen' component={InfoScreen} />
        </BottomTab.Navigator>
      ) : (
        <AuthStack.Navigator initialRouteName='AuthScreen'>
          <AuthStack.Screen
            name='AuthScreen'
            component={AuthScreen}
            options={{ headerShown: false }}
          />
          <AuthStack.Screen
            name='PasswordResetScreen'
            component={PasswordResetScreen}
          />
        </AuthStack.Navigator>
      )}
    </NavigationContainer>
  );
}
