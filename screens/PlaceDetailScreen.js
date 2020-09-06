import React from "react";
import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import { useSelector } from "react-redux";
import MapPreview from "../components/MapPreview";
import Colors from "../constants/Colors";

const PlaceDetailScreen = (props) => {
  const { navigation } = props;

  const placeId = navigation.getParam("placeId");
  // find returns the value of the first element that satisfies the condition
  const selectedPlace = useSelector((state) =>
    state.places.places.find((place) => place.id === placeId)
  );

  const { imageUri, address, longitude, latitude } = selectedPlace;

  const selectedLocation = { latitude: latitude, longitude: longitude };

  const showMapHandler = () => {
    props.navigation.navigate("Map", {
      readOnly: true,
      initialLocation: selectedLocation,
    });
  };

  return (
    <ScrollView contentContainerStyle={{ alignItems: "center" }}>
      <Image source={{ uri: imageUri }} style={styles.image} />
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>
            {address} {selectedLocation.longitude} {selectedLocation.latitude}
          </Text>
        </View>
        <MapPreview
          style={styles.mapPreview}
          location={selectedLocation}
          onPress={showMapHandler}
        />
      </View>
    </ScrollView>
  );
};

PlaceDetailScreen.navigationOptions = (navData) => {
  return {
    headerTitle: navData.navigation.getParam("placeTitle"),
  };
};

export default PlaceDetailScreen;

const styles = StyleSheet.create({
  image: {
    height: "35%",
    minHeight: 300,
    width: "100%",
    backgroundColor: "#ccc",
  },
  locationContainer: {
    marginVertical: 20,
    width: "90%",
    maxWidth: 350,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    backgroundColor: "white",
    borderRadius: 10,
  },
  addressContainer: {
    padding: 20,
  },
  address: {
    color: Colors.primary,
    textAlign: "center",
  },
  mapPreview: {
    width: "100%",
    maxWidth: 350,
    height: 300,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
});
