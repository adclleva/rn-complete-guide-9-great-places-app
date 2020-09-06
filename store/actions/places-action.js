import * as FileSystem from "expo-file-system";

// these methods are utilizing
import { insertPlace, fetchPlaces } from "../../helpers/db";
import ENV from "../../env";

export const ADD_PLACE = "ADD_PLACE";
export const SET_PLACES = "SET_PLACES"; // to fetch the places to he server

export const addPlace = (title, image, location) => {
  return async (dispatch) => {
    // this sends a get request
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.latitude},${location.longitude}&key=${ENV.googleApiKey}`
    );

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    const responseData = await response.json();

    if (!responseData.results) {
      throw new Error("Something went wrong!");
    }

    /** we can look here for reference: https://developers.google.com/maps/documentation/geocoding/start#reverse
     * we get this address from the response of the Geocoding API for Reverse geocoding
     */
    const address = responseData.results[0].formatted_address;

    // image is the temporary file name and will get the file name
    const fileName = image.split("/").pop();

    // we generate a path and append the file name
    const newPath = FileSystem.documentDirectory + fileName;

    /**
     * we will need to move the file of the image and will persist within the app of the device
     * this is where we will move the file from one place to another with the moveAsync method
     *  and will return a promise
     * we do it in a try catch block just in case it fails
     */

    try {
      await FileSystem.moveAsync({
        from: image,
        to: newPath,
      });
      // we will try to insert to the database
      const dbResult = await insertPlace(
        title,
        newPath,
        address,
        location.latitude,
        location.longitude
      );
      /** what dbResult looks like
        dbResult WebSQLResultSet {
          "insertId": 1,
          "rows": WebSQLRows {
            "_array": Array [],
            "length": 0,
          },
          "rowsAffected": 1,
        }
       */

      dispatch({
        type: ADD_PLACE,
        placeData: {
          id: dbResult.insertId, // this will be a number but we can convert it to a string
          title: title,
          image: newPath,
          address: address,
          coordinates: {
            latitude: location.latitude,
            longitude: location.longitude,
          },
        },
      });
    } catch (error) {
      console.log("Error", error);
      throw error;
    }

    // we will use the newPath from the FileSystem expo library
  };
};

export const loadPlaces = () => {
  return async (dispatch) => {
    try {
      const dbResult = await fetchPlaces();
      /** what dbResult looks like
       * dbResult WebSQLResultSet {
          "insertId": undefined,
          "rows": WebSQLRows {
            "_array": Array [
              Object {
                "address": "Dummy Address",
                "id": 1,
                "imageUri": "file:///data/user/0/host.exp.exponent/files/ExperienceData/%2540anonymous%252Frn-complete-guide-9-great-places-app-dc04d009-93dd-4b88-bf90-80cd7c722fb2/9d21fa31-9b1b-4cf1-a43d-cb3106d6e62f.jpg",
                "latitude": 15.6,
                "longitude": 12.3,
                "title": "First Test",
              },
            ],
            "length": 1,
          },
          "rowsAffected": 0,
        }
       */
      dispatch({ type: SET_PLACES, places: dbResult.rows._array });
    } catch (error) {
      throw error;
    }
  };
};
