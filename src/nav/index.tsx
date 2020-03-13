import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './AuthStack';
import SplashScreen from '../screens/splash';
import BottomTab from './BottomTab';
import { AuthStatus } from '../data-types';

interface Props {
  authStatus: AuthStatus;
}

export default function Layout({ authStatus }: Props) {
  if (authStatus === AuthStatus.Checking) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      {authStatus === AuthStatus.SignedIn ? BottomTab() : AuthStack()}
    </NavigationContainer>
  );
}
