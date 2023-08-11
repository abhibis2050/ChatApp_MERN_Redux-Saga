import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

const sagaMiddleware = createSagaMiddleware();

export const Store = configureStore({
  reducer: {},
  middleware: [sagaMiddleware],
});

// sagaMiddleware.run(rootSaga);
