import React from 'react';
import { Provider } from 'react-redux';
import { registerRootComponent } from 'expo';
import * as TaskManager from 'expo-task-manager';
import { LocationData } from 'expo-location';
import { decode, encode } from 'base-64';
import * as API from './api';
import store from './store';
import App from './App';

if (!global.btoa) {
  global.btoa = encode;
}

if (!global.atob) {
  global.atob = decode;
}

TaskManager.defineTask(
  'sendLastLocationToBackend',
  async ({ data: { locations }, error }) => {
    if (error) return;
    const safeLocations = locations as LocationData[];
    if (safeLocations.length > 0) {
      const {
        coords: { latitude, longitude },
      } = safeLocations[safeLocations.length - 1];
      const { uid } = store.getState().auth.userInfo;
      await API.requestUpdateUserInfo(uid, {
        lastLocation: { lat: latitude, lng: longitude },
      });
    }
  }
);

function Root() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

registerRootComponent(Root);
