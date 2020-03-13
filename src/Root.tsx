import React from 'react';
import { registerRootComponent } from 'expo';
import App from './App';

function Root() {
  return <App />;
}

registerRootComponent(Root);
