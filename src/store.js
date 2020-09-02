import {applyMiddleware, combineReducers, createStore} from "redux";
import reducer from "./reducer";
import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga"
import {watchLoadData} from "./sagas";

const rootReducer = combineReducers({
  companyInformation: reducer
});

// const sagaMiddleware = createSagaMiddleware()

const store = createStore(rootReducer,applyMiddleware(thunk));
// sagaMiddleware.run(watchLoadData)
export default store;
