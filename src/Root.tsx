import React from 'react';
import { registerRootComponent } from 'expo';
import App from './App';

function Root(): JSX.Element {
  return <App />;
}

registerRootComponent(Root);
