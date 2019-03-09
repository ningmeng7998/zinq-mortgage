import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
//we can import from ./reducers because we called our reducer index.js. So, we don't need to put index.js
import rootReducer from "./reducers";

const initialState = {};
const middleware = [thunk];

//rootreducer, initialState , middlewares

const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(...middleware),
    //implement redux extension in google chrome, need compose
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
