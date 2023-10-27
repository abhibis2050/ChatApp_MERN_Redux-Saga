import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { authReducer } from "./app/authSlice";
import { rootSaga } from "./saga/rootSaga";
import { userReducer } from "./app/UserSlice";
import { chatReducer } from "./app/ChatSlice";
import { messageReducer } from "./app/messageSlice";
import { groupReducer } from "./app/GroupSlice";
import { blogReducer } from "./app/blogSlice";

const sagaMiddleware = createSagaMiddleware();

export const Store = configureStore({
  reducer: {
    auth:authReducer,
    user:userReducer,
    chat:chatReducer,
    message:messageReducer,
    group:groupReducer,
    blog:blogReducer,
  },
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(rootSaga);
