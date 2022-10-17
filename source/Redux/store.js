import { combineReducers,createStore } from "redux";
import testReducer from "./Reducers/testReducer";
import createSagaMiddleware from "@redux-saga/core";
import { applyMiddleware } from "redux";
import { watcherSaga } from "./sagas/rootSaga";
import sagas from "./sagas";
import AsyncStorage from '@react-native-community/async-storage';
import {persistStore, persistReducer} from 'redux-persist';
import Auth from "./Reducers/Auth";
const reducers = combineReducers({
    test:testReducer,
    Auth:Auth,
})
const persistConfig = {
    key: 'root',
    version: 1,
    storage: AsyncStorage,
    blacklist: [],
  };
const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];
const persistedReducer = persistReducer(persistConfig, reducers);

const store = createStore(persistedReducer,{},applyMiddleware(...middleware))
//sagaMiddleware.run(watcherSaga)
sagas.forEach((saga)=> sagaMiddleware.run(saga))
export default store;