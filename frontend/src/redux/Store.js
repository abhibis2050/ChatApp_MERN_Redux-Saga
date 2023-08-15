import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { authReducer } from "./app/authSlice";
import { rootSaga } from "./saga/rootSaga";

const sagaMiddleware = createSagaMiddleware();

export const Store = configureStore({
  reducer: {
    auth:authReducer
  },
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(rootSaga);
