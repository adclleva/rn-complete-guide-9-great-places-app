import React from "react";
import { useSelector } from "react-redux";
import { StyleSheet, Text, View, Platform, FlatList } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import CustomHeaderButton from "../components/CustomHeaderButton";
import PlaceItem from "../components/PlaceItem";

const PlacesListScreen = (props) => {
  const places = useSelector((state) => state.places.places);

  return (
    <FlatList
      data={places}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <PlaceItem
          image={itemData.item.imageUri}
          onSelect={() => {
            props.navigation.navigate("PlaceDetail", {
              placeTitle: itemData.item.title,
              placeId: itemData.item.id,
            });
          }}
          address={null}
          title={itemData.item.title}
        />
      )}
    />
  );
};

// we have this as a function with navData as a prop to get access to navigation.navigate
PlacesListScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "All Places",
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Add Place"
          iconName={Platform.OS === "android" ? "md-add" : "ios-add"}
          onPress={() => {
            navData.navigation.navigate("NewPlace");
          }}
        />
      </HeaderButtons>
    ),
  };
};

export default PlacesListScreen;

const styles = StyleSheet.create({});
