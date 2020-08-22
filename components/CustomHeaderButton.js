import React from "react";
import { Platform } from "react-native";

import { HeaderButton } from "react-navigation-header-buttons";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../constants/Colors";

const CustomHeaderButton = (props) => {
  return (
    <HeaderButton
      {...props}
      IconComponent={Ionicons}
      iconSize={23}
      // the color of the icon depends on the platform where the background color
      color={Platform.OS === "android" ? "#fff" : Colors.primary}
    />
  );
};

export default CustomHeaderButton;
