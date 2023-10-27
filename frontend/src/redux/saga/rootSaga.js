import { all } from "redux-saga/effects";
import { watchAuthAsync } from "./authSaga";
import { watchChat } from "./chatSaga";
import { watchMessage } from "./messageSaga";
import { watchUser } from "./userSaga";
import { watchGroup } from "./groupSaga";
import { watchBlog } from "./blogSaga";



export function* rootSaga(){
    yield all([
        watchAuthAsync(),
        watchChat(),
        watchMessage(),
        watchUser(),
        watchGroup(),
        watchBlog()
    ])
}