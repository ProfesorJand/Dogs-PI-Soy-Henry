import { createStore, applyMiddleware } from "redux";
import rootReducer from "../reducer";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension"

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk)),
    
);

// const store = createStore(
//     rootReducer,
//     compose(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()),
    
// );

export default store;