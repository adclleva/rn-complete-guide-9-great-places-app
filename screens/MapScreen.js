import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
  Alert,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import Colors from "../constants/Colors";

const MapScreen = (props) => {
  const initialLocation = props.navigation.getParam("initialLocation");
  const readOnly = props.navigation.getParam("readOnly");

  // the initialLocation would be the default state for selectedLocation so it could be undefined
  const [selectedLocation, setSelectedLocation] = useState(initialLocation);
  /**
   * the Delta's show how much space we have with the longitude and latitude surface
   * this is what we need for the region prop of the MapView
   * it's also important to add a style to the MapView component
   * we also set the initial region c
   */

  const mapRegion = {
    latitude: initialLocation ? initialLocation.latitude : 37.8,
    longitude: initialLocation ? initialLocation.longitude : -122.43,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  /**
   * we need to pass this function to the navigation options of this component
   * by utilizing the useEffect and useCallback pattern to avoid the infinite rendering loop
   * here we will go back to the NewPlace screen and pass params down to the screen to save the pickedLocation
   */
  const savePickedLocationHandler = useCallback(() => {
    if (!selectedLocation) {
      Alert.alert("Location has not been selected", "Please select a location");
      return;
    }
    props.navigation.navigate("NewPlace", { pickedLocation: selectedLocation });
  }, [selectedLocation]);

  // this will pass the function down to the navigationOptions on this component
  useEffect(() => {
    props.navigation.setParams({ saveLocation: savePickedLocationHandler });
  }, [savePickedLocationHandler]);

  const selectLocationHandler = (event) => {
    // picking a location is disabled when it's read only
    if (readOnly) {
      return;
    }

    // this is what we get from the event that comes from the onPress of MapView
    setSelectedLocation({
      latitude: event.nativeEvent.coordinate.latitude,
      longitude: event.nativeEvent.coordinate.longitude,
    });
  };

  // we created the markerCoordinates to check and conditionally render the marker
  let markerCoordinates;

  if (selectedLocation) {
    markerCoordinates = {
      latitude: selectedLocation.latitude,
      longitude: selectedLocation.longitude,
    };
  }
  /**
   * we have this MapView as a parent component to import and use the Marker as a child component
   */
  return (
    <MapView
      style={styles.map}
      region={mapRegion}
      onPress={selectLocationHandler}
    >
      {markerCoordinates && (
        <Marker title="Picked Location" coordinate={markerCoordinates}></Marker>
      )}
    </MapView>
  );
};

MapScreen.navigationOptions = (navData) => {
  const saveFunction = navData.navigation.getParam("saveLocation");
  const readOnly = navData.navigation.getParam("readOnly");

  // we return an empty object for the configuration
  if (readOnly) {
    return {};
  }

  return {
    headerRight: (
      <TouchableOpacity style={styles.headerButton} onPress={saveFunction}>
        <Text style={styles.headerButtonText}>Save</Text>
      </TouchableOpacity>
    ),
  };
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  headerButton: {
    marginHorizontal: 20,
  },
  headerButtonText: {
    fontSize: 16,
    color: Platform.OS === "android" ? "white" : Colors.primary,
  },
});

export default MapScreen;
