import * as SQLite from "expo-sqlite";

/**
 * this will hold a reference to the database and it will either connect or create
 * the database if not found
 * this will be executed whenever this gets imported anywhere
 */
const db = SQLite.openDatabase("places.db");

// so initialize the database
export const init = () => {
  const promise = new Promise((resolve, reject) => {
    /**
     * A Transaction object is passed in as a parameter to the callback parameter
     * for the db.transaction() method on a Database (see above).
     * It allows enqueuing SQL statements to perform in a database transaction.
     */
    db.transaction((tx) => {
      /**
       * Parameters
       * sqlStatement (string) -- A string containing a database query to execute expressed as SQL. The string may contain ? placeholders, with values to be substituted listed in the arguments parameter.
       * arguments (array) -- An array of values (numbers or strings) to substitute for ? placeholders in the SQL statement.
       * success (function) -- Called when the query is successfully completed during the transaction. Takes two parameters: the transaction itself, and a ResultSet object (see below) with the results of the query.
       * error (function) -- Called if an error occured executing this particular query in the transaction. Takes two parameters: the transaction itself, and the error object.
       */
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS places (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, imageUri TEXT NOT NULL, address TEXT NOT NULL, latitude REAL NOT NULL, longitude REAL NOT NULL);",
        [],
        // this will run when the transaction is a success
        () => {
          resolve();
        },
        // this will run when the transaction failed
        (_, error) => {
          reject(error);
        }
      );
    });
  });

  // we return this promise depending if the function passes or not
  return promise;
};

export const insertPlace = (title, imageUri, address, latitude, longitude) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        /**
         * we can use string interpolation but it would leave it vulnerable to sql injection attacks
         */
        "INSERT INTO places (title, imageUri, address, latitude, longitude) VALUES (?, ?, ?, ?, ?);",
        // passing the values into will allow some protection and
        [title, imageUri, address, latitude, longitude],
        (_, result) => {
          resolve(result);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });

  return promise;
};

export const fetchPlaces = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        /**
         * we are going to do a query that will get the places data from the database
         */
        "SELECT * FROM places",
        // passing the values into will allow some protection and
        [],
        (_, result) => {
          resolve(result);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });

  return promise;
};
