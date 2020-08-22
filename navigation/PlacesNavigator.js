import { Platform } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import NewPlaceScreen from "../screens/NewPlaceScreen";
import PlaceDetailScreen from "../screens/PlaceDetailScreen";
import PlacesListScreen from "../screens/PlacesListScreen";
import MapScreen from "../screens/MapScreen";
import Colors from "../constants/Colors";

const PlacesNavigator = createStackNavigator(
  {
    Places: PlacesListScreen,
    PlaceDetail: PlaceDetailScreen,
    NewPlace: NewPlaceScreen,
    Map: MapScreen,
  },
  {
    defaultNavigationOptions: {
      // the style of the header of the screen
      headerStyle: {
        backgroundColor: Platform.OS === "android" ? Colors.primary : "",
      },
      // this is for the text color
      headerTintColor: Platform.OS === "android" ? "#fff" : Colors.primary,
    },
  }
);

export default createAppContainer(PlacesNavigator);
