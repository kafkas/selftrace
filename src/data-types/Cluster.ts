import { ClusterObject } from '.';
import MathUtils from '../util/MathUtils';

interface Cluster extends ClusterObject {}

class Cluster {
  /** Creates a cluster. */
  constructor() {
    this.positiveCount = 0;
    this.showingSymptomsCount = 0;
  }

  add(lat: number, lng: number, status: number): void {
    if (this.size() === 0) {
      this.lat = lat;
      this.lng = lng;
    } else {
      this.lat = MathUtils.weightedAvg(this.lat, this.size(), lat, 1);
      this.lng = MathUtils.weightedAvg(this.lng, this.size(), lng, 1);
    }

    if (status === 2) {
      this.showingSymptomsCount++;
    } else {
      // (status === 4)
      this.positiveCount++;
    }
  }

  size(): number {
    return this.positiveCount + this.showingSymptomsCount;
  }
}

export { Cluster };
