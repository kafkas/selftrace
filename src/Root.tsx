import React from 'react';
import { Provider } from 'react-redux';
import { registerRootComponent } from 'expo';
import { decode, encode } from 'base-64';
import store from './store';
import App from './App';
import './config/localization';
import './config/tasks';

// Define these to prevent firebase error
if (!global.btoa) {
  global.btoa = encode;
}

if (!global.atob) {
  global.atob = decode;
}

function Root() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

registerRootComponent(Root);
