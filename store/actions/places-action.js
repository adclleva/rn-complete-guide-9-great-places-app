import * as FileSystem from "expo-file-system";
import { insertPlace } from "../../helpers/db";

export const ADD_PLACE = "ADD_PLACE";

export const addPlace = (title, image) => {
  return async (dispatch) => {
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
        "Dummy Address",
        15.6,
        12.3
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
    } catch (error) {
      console.log(error);
      throw error;
    }

    // we will use the newPath from the FileSystem expo library
    dispatch({
      type: ADD_PLACE,
      placeData: {
        id: dbResult.insertId, // this will be a number but we can convert it to a string
        title: title,
        image: newPath,
      },
    });
  };
};
