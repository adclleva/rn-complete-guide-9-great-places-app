import React from "react";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";

import PlacesNavigator from "./navigation/PlacesNavigator";
import placesReducer from "./store/reducers/places-reducer";
import { init } from "./helpers/db";

// to initialize the database when we run the app
init()
  .then(() => {
    console.log("Initialized database");
  })
  .catch((error) => {
    console.log("Initializing db failed.");
    console.log("error");
  });

// this will combine the reducers together
const rootReducer = combineReducers({
  places: placesReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  return (
    <Provider store={store}>
      <PlacesNavigator />
    </Provider>
  );
}
