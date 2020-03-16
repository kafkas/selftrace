const config = {
  apiKey: 'AIzaSyBt2GzYh_28wwOPLMBpKzuvIe8mY7fVlKc',
  authDomain: 'corona-688fb.firebaseapp.com',
  databaseURL: 'https://corona-688fb.firebaseio.com',
  projectId: 'corona-688fb',
  storageBucket: 'corona-688fb.appspot.com',
  messagingSenderId: '716029004059',
  appId: '1:716029004059:web:5f97cf12accd06fdf36bbe',
  measurementId: 'G-HD2REHGWCR',
};

export const BASE_URL = `https://us-central1-${config.projectId}.cloudfunctions.net`;

export const CLUSTERS_ENDPOINT = BASE_URL + '/processClusterRequest';
export const CLUSTERS_ENDPOINT_DEV =
  'http://localhost:5000/corona-688fb/us-central1/processClusterRequest';

export default config;
