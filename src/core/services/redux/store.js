import { applyMiddleware, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import { composeWithDevTools } from "@redux-devtools/extension";

import rootReducer from "./rootReducer";
import rootSaga from '../sagas/index'

function createAppStore(reducer) {
    const sagaMiddleware = createSagaMiddleware();
    const store = createStore(
      reducer,
      composeWithDevTools(applyMiddleware(sagaMiddleware))
    );
    sagaMiddleware.run(rootSaga);

  return store;
}

export default createAppStore(rootReducer);