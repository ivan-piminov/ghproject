import {applyMiddleware, combineReducers, createStore} from "redux";
import reducer from "./reducer";
import createSagaMiddleware from "redux-saga"
import {watchAll} from './sagas'

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
    companyInformation: reducer
});
type RootReducerType = typeof rootReducer
export type AppStateType = ReturnType<RootReducerType>
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

export default store;
sagaMiddleware.run(watchAll);
