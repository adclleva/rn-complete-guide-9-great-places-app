import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  ActivityIndicator,
  Alert,
} from "react-native";

import * as Location from "expo-location";
import * as Permissions from "expo-permissions";

import Colors from "../constants/Colors";
import MapPreview from "./MapPreview";

const LocationPicker = (props) => {
  const [pickedLocation, setPickedLocation] = useState();
  const [isFetching, setIsFetching] = useState(false);

  /**
   * we make sure to check the permissions to enable the location
   * we can copy the verification function from location picker
   */

  const verifyPermissions = async () => {
    // this will get a promise which get a prompt for location permissions
    // the result will be stored within the IOS so it won't need to ask again
    const result = await Permissions.askAsync(Permissions.LOCATION);

    // if the user denied permissions, we will send a message to the user
    if (result.status !== "granted") {
      Alert.alert(
        "Insufficient permissions!",
        "You need to grant location permissions to use this app.",
        [{ text: "Okay" }]
      );
      return false;
    }
    return true;
  };

  const getLocationHandler = async () => {
    const hasPermission = await verifyPermissions();

    // we get out of this function if we can't get permissions
    if (!hasPermission) {
      return;
    }

    try {
      /**
       * this will return a promise if the we get the user location or not
       * we pass in the timerInterval where if 5 seconds passed, it will throw and error
       */
      setIsFetching(true);
      const location = await Location.getCurrentPositionAsync({
        timeInterval: 5000,
      });
      /** this is what location returns if successful
      location Object {
        "coords": Object {
          "accuracy": 5,
          "altitude": 0,
          "altitudeAccuracy": -1,
          "heading": -1,
          "latitude": 37.785834,
          "longitude": -122.406417,
          "speed": -1,
        },
        "timestamp": 1598832910903.9941,
      }
       */
      console.log("location", location);
      setPickedLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    } catch (error) {
      Alert.alert(
        "Could not fetch location!",
        "Please try again later or pick a location on the map.",
        [{ text: "Okay" }]
      );
    }

    setIsFetching(false);
  };

  const pickOnMapHandler = () => {
    props.navigation.navigate("Map");
  };

  return (
    <View style={styles.LocationPicker}>
      <View style={styles.mapPreview}>
        <MapPreview
          style={styles.mapPreview}
          location={pickedLocation}
          onPress={pickOnMapHandler}
        >
          {isFetching ? (
            <ActivityIndicator size="large" color={Colors.primary} />
          ) : (
            <Text>No location chosen yet!</Text>
          )}
        </MapPreview>
      </View>
      <View style={styles.actions}>
        <Button
          title="Get User Location"
          color={Colors.primary}
          onPress={getLocationHandler}
        />
        <Button
          title="Pick on Map"
          color={Colors.primary}
          onPress={pickOnMapHandler}
        />
      </View>
    </View>
  );
};

export default LocationPicker;

const styles = StyleSheet.create({
  LocationPicker: {
    marginBottom: 15,
  },
  mapPreview: {
    marginBottom: 10,
    width: "100%",
    height: 150,
    borderColor: "#ccc",
    borderWidth: 1,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
});
