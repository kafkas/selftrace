import { MarkerClusterer, ClusterAugmentedMarker } from './MarkerClusterer';

export class Cluster {
  private map_ = this.markerClusterer_.getMap() as google.maps.Map;
  private minClusterSize_: number = this.markerClusterer_.getMinimumClusterSize();
  private averageCenter_: boolean = this.markerClusterer_.getAverageCenter();
  private markers_: ClusterAugmentedMarker[] = []; // TODO: type;
  private center_: google.maps.LatLng = null;
  private bounds_: google.maps.LatLngBounds = null;

  /**
   * Returns the number of markers managed by the cluster. You can call this from
   * a `click`, `mouseover`, or `mouseout` event handler for the `MarkerClusterer` object.
   *
   * @return The number of markers in the cluster.
   */
  getSize(): number {
    return this.markers_.length;
  }

  /**
   * Returns the array of markers managed by the cluster. You can call this from
   * a `click`, `mouseover`, or `mouseout` event handler for the `MarkerClusterer` object.
   *
   * @return The array of markers in the cluster.
   */
  getMarkers(): google.maps.Marker[] {
    return this.markers_;
  }

  /**
   * Returns the center of the cluster. You can call this from
   * a `click`, `mouseover`, or `mouseout` event handler
   * for the `MarkerClusterer` object.
   *
   * @return The center of the cluster.
   */
  getCenter(): google.maps.LatLng {
    return this.center_;
  }

  /**
   * Returns the map with which the cluster is associated.
   *
   * @return The map.
   * @ignore
   */
  getMap(): google.maps.Map {
    return this.map_;
  }

  /**
   * Returns the `MarkerClusterer` object with which the cluster is associated.
   *
   * @return The associated marker clusterer.
   * @ignore
   */
  getMarkerClusterer(): MarkerClusterer {
    return this.markerClusterer_;
  }

  /**
   * Returns the bounds of the cluster.
   *
   * @return the cluster bounds.
   * @ignore
   */
  getBounds(): google.maps.LatLngBounds {
    const bounds = new google.maps.LatLngBounds(this.center_, this.center_);
    const markers = this.getMarkers();
    for (let i = 0; i < markers.length; i++) {
      bounds.extend(markers[i].getPosition());
    }
    return bounds;
  }

  /**
   * Removes the cluster from the map.
   *
   * @ignore
   */
  remove(): void {
    this.markers_ = [];
    delete this.markers_;
  }

  /**
   * Adds a marker to the cluster.
   *
   * @param marker The marker to be added.
   * @return True if the marker was added.
   * @ignore
   */
  addMarker(marker: google.maps.Marker & { isAdded?: boolean }): boolean {
    if (this.isMarkerAlreadyAdded_(marker)) {
      return false;
    }

    if (!this.center_) {
      this.center_ = marker.getPosition();
      this.calculateBounds_();
    } else if (this.averageCenter_) {
      const l = this.markers_.length + 1;
      const lat =
        (this.center_.lat() * (l - 1) + marker.getPosition().lat()) / l;
      const lng =
        (this.center_.lng() * (l - 1) + marker.getPosition().lng()) / l;
      this.center_ = new google.maps.LatLng(lat, lng);
      this.calculateBounds_();
    }

    marker.isAdded = true;
    this.markers_.push(marker);

    const mCount = this.markers_.length;
    const mz = this.markerClusterer_.getMaxZoom();
    if (mz !== null && this.map_.getZoom() > mz) {
      // Zoomed in past max zoom, so show the marker.
      if (marker.getMap() !== this.map_) {
        marker.setMap(this.map_);
      }
    } else if (mCount < this.minClusterSize_) {
      // Min cluster size not reached so show the marker.
      if (marker.getMap() !== this.map_) {
        marker.setMap(this.map_);
      }
    } else if (mCount === this.minClusterSize_) {
      // Hide the markers that were showing.
      for (let i = 0; i < mCount; i++) {
        this.markers_[i].setMap(null);
      }
    } else {
      marker.setMap(null);
    }

    return true;
  }

  /**
   * Determines if a marker lies within the cluster's bounds.
   *
   * @param marker The marker to check.
   * @return True if the marker lies in the bounds.
   * @ignore
   */
  isMarkerInClusterBounds(marker: google.maps.Marker): boolean {
    return this.bounds_.contains(marker.getPosition());
  }

  /**
   * Calculates the extended bounds of the cluster with the grid.
   */
  private calculateBounds_(): void {
    const bounds = new google.maps.LatLngBounds(this.center_, this.center_);
    this.bounds_ = this.markerClusterer_.getExtendedBounds(bounds);
  }

  /**
   * Determines if a marker has already been added to the cluster.
   *
   * @param marker The marker to check.
   * @return True if the marker has already been added.
   */
  private isMarkerAlreadyAdded_(marker: google.maps.Marker): boolean {
    if (this.markers_.indexOf) {
      return this.markers_.indexOf(marker) !== -1;
    }
    for (let i = 0; i < this.markers_.length; i++) {
      if (marker === this.markers_[i]) {
        return true;
      }
    }

    return false;
  }
}
