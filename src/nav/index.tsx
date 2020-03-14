import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTab from './BottomTab';
import AuthScreen from '../screens/auth';
import PasswordResetScreen from '../screens/password-reset';
import SplashScreen from '../screens/splash';
import { AuthStatus } from '../data-types';

const Stack = createStackNavigator();

interface Props {
  authStatus: AuthStatus;
}

export default function Layout({ authStatus }: Props) {
  if (authStatus === AuthStatus.Checking) {
    return <SplashScreen />;
  }

  const isSignedOut = authStatus === AuthStatus.SignedOut;

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isSignedOut ? (
          <>
            <Stack.Screen
              name='AuthScreen'
              component={AuthScreen}
              options={{
                headerShown: false,
                animationTypeForReplace: isSignedOut ? 'pop' : 'push',
              }}
            />
            <Stack.Screen
              name='PasswordResetScreen'
              component={PasswordResetScreen}
            />
          </>
        ) : (
          <Stack.Screen
            name='BottomTab'
            component={BottomTab}
            options={{ headerShown: false }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
