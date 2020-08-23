import React from "react";
import { StyleSheet, Text, View, Image, Button, Alert } from "react-native";
import Colors from "../constants/Colors";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";

// renamed to ImgPicker to avoid name clashing from the xpo library
const ImgPicker = (props) => {
  /**
   * we need to make sure to enable permissions for the camera and we utilized the
   * expo-permissions library in order to do that
   * in this case, we will need both the camera and camera roll in order to access the camera
   */
  const verifyPermissions = async () => {
    // this will get a promise which get a prompt for camera permissions
    // the result will be stored within the IOS so it won't need to ask again
    const result = await Permissions.askAsync(
      Permissions.CAMERA,
      Permissions.CAMERA_ROLL
    );

    // if the user denied permissions, we will send a message to the user
    if (result.status !== "granted") {
      Alert.alert(
        "Insufficient permissions!",
        "You need to grant camera permissions to use this app.",
        [{ text: "Okay" }]
      );
      return false;
    }
    return true;
  };

  const takeImageHandler = async () => {
    const hasPermission = await verifyPermissions();

    // if the camera permission not granted, get out of this function
    if (!hasPermission) {
      return;
    }
    // this is an async option that will open up the camera and will return a promise
    ImagePicker.launchCameraAsync();
  };

  return (
    <View style={styles.imagePicker}>
      <View style={styles.imagePreview}>
        <Text>No image picked yet.</Text>
        <Image style={styles.image} />
      </View>
      <Button
        title="Take Image"
        color={Colors.primary}
        onPress={takeImageHandler}
      />
    </View>
  );
};

export default ImgPicker;

const styles = StyleSheet.create({
  imagePicker: {
    alignItems: "center",
  },
  imagePreview: {
    width: "100%",
    height: 200,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#ccc",
    borderWidth: 1,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
