import { all } from "redux-saga/effects";
import { watchAuthAsync } from "./authSaga";



export function* rootSaga(){
    yield all([
        watchAuthAsync()
    ])
}