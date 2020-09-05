import React from "react";
import { StyleSheet, Text, View } from "react-native";
import MapView from "react-native-maps";

const MapScreen = (props) => {
  /**
   * the Delta's show how much space we have with the longitude and latitude surface
   * this is what we need for the region prop of the MapView
   * it's also important to add a style to the MapView component
   */

  const mapRegion = {
    latitude: 37.8,
    longitude: -122.43,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };
  return <MapView style={styles.map} region={mapRegion} />;
};

export default MapScreen;

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
