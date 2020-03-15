export interface Cluster {
  size: number;
  location: {
    lat: number;
    lng: number;
  };
}

export interface Region {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}
