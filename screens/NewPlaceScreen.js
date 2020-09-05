import React, { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { StyleSheet, Text, View, Button } from "react-native";
import { TextInput, ScrollView } from "react-native-gesture-handler";

import Colors from "../constants/Colors";
import * as placesActions from "../store/actions/places-action";
import ImagePicker from "../components/ImagePicker";
import LocationPicker from "../components/LocationPicker";

const NewPlaceScreen = (props) => {
  const [titleValue, setTitleValue] = useState("");
  const [selectedImage, setSelectedImage] = useState();
  const [selectedLocation, setSelectedLocation] = useState();

  const dispatch = useDispatch();

  const titleChangeHandler = (text) => {
    // validation can be added here
    setTitleValue(text);
  };

  const savePlaceHandler = () => {
    dispatch(
      placesActions.addPlace(titleValue, selectedImage, selectedLocation)
    );
    props.navigation.goBack();
  };

  /**
   * we put this in a useCallback function in order to avoid re-renders and
   recreated with every render cycle as well as infinite loops 
   */
  const locationPickedHandler = useCallback((location) => {
    setSelectedLocation(location);
  }, []);

  const imageTakenHandler = (imagePath) => {
    setSelectedImage(imagePath);
  };

  return (
    <ScrollView>
      <View style={styles.form}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={titleChangeHandler}
          value={titleValue}
        />
        <ImagePicker onImageTaken={imageTakenHandler} />
        <LocationPicker
          navigation={props.navigation}
          onLocationPicked={locationPickedHandler}
        />
        <Button
          title="Save Place"
          color={Colors.primary}
          onPress={savePlaceHandler}
        />
      </View>
    </ScrollView>
  );
};

NewPlaceScreen.navigationOptions = {
  headerTitle: "Add Place",
};

export default NewPlaceScreen;

const styles = StyleSheet.create({
  form: {
    margin: 30,
  },
  label: {
    fontSize: 18,
    marginBottom: 15,
  },
  textInput: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    marginBottom: 15,
    paddingVertical: 4,
    paddingHorizontal: 2,
  },
});
