import { call, put, takeEvery } from "redux-saga/effects";
import { GetSingleUserWithIdAction } from "../api/UserAction";
import { setSingleChatUser } from "../app/ChatSlice";

function* chatSingleUserSaga(action) {
    const response = yield call (GetSingleUserWithIdAction,action.payload)
    console.log("chatSingleUserSaga---->", response);
    if(response.status===200){
        yield put(setSingleChatUser({singleChatUser:response?.data?.data}))
    }
}

export function* watchUser() {
  yield takeEvery("CHAT_SINGLE_USER_DETAIL", chatSingleUserSaga);
}
