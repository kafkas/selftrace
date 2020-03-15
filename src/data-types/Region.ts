import { RegionObject } from '.';

/*
 * lat: [-90, 90] (parallel)
 * lng: [-180, 180] (meridian)
 */

interface Region extends RegionObject {}

class Region {
  constructor(
    centerLat: number,
    centerLng: number,
    latDelta: number,
    lngDelta: number
  ) {
    this.latitude = centerLat;
    this.longitude = centerLng;
    this.latitudeDelta = latDelta;
    this.longitudeDelta = lngDelta;
  }

  contains(lat: number, lng: number): boolean {
    if (
      lat > this.latitude + this.latitudeDelta ||
      lat < this.latitude - this.latitudeDelta
    ) {
      return false;
    }

    if (
      lng > this.longitude + this.longitudeDelta ||
      lng < this.longitude - this.longitudeDelta
    ) {
      return false;
    }

    return true;
  }
}

export { Region };
