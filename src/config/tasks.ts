import * as TaskManager from 'expo-task-manager';
import { LocationData } from 'expo-location';
import * as API from '../api';
import store from '../store';

// Define background tasks
TaskManager.defineTask(
  'sendLastLocationToBackend',
  async ({ data: { locations }, error }) => {
    if (error) return;

    const safeLocations = locations as LocationData[];
    if (safeLocations.length === 0) return;

    const {
      coords: { latitude, longitude },
    } = safeLocations[safeLocations.length - 1];
    const { uid } = store.getState().auth.userInfo;
    try {
      const res = await API.requestUserInfo(uid);
      if (res) {
        await API.requestUpdateUserInfo(uid, {
          lastLocation: { lat: latitude, lng: longitude },
        });
      }
    } catch (err) {
      //
      console.log('err = ', err);
    }
  }
);
