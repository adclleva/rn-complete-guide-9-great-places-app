import { Switch } from "react-native-gesture-handler";
import { ADD_PLACE, SET_PLACES } from "../actions/places-action";
import Place from "../../models/place";

const initialState = {
  places: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PLACES:
      return {
        // this is coming sql
        places: action.places.map(
          (place) => new Place(place.id.toString(), place.title, place.imageUri)
        ),
      };
    case ADD_PLACE:
      const newPlace = new Place(
        // converted the number to a string
        action.placeData.id.toString(),
        action.placeData.title,
        action.placeData.image
      );

      return {
        places: state.places.concat(newPlace),
      };
    default:
      return state;
  }
};
