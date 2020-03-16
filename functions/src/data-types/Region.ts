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

  topLat(): number {
    return this.latitude + this.latitudeDelta;
  }

  bottomLat(): number {
    return this.latitude - this.latitudeDelta;
  }

  leftLng(): number {
    return this.longitude - this.longitudeDelta;
  }

  rightLng(): number {
    return this.longitude + this.longitudeDelta;
  }

  getSubregions(rowCount: number, colCount: number): Region[] {
    const count = rowCount * colCount;

    const hh = this.latitudeDelta / rowCount;
    const h = 2 * hh;
    const hw = this.longitudeDelta / colCount;
    const w = 2 * hw;

    const subregions = new Array<Region>(count);
    for (let i = 0; i < subregions.length; i++) {
      const centerLat = this.topLat() - hh - h * Math.floor(i / colCount);
      const centerLng = this.leftLng() + hw + w * (i % colCount);
      subregions[i] = new Region(centerLat, centerLng, hh, hw);
    }
    return subregions;
  }
}

export { Region };
