import { call, put, takeEvery } from "redux-saga/effects";
import { GetAllContactsAction, GetSingleUserWithIdAction } from "../api/UserAction";
import { setSingleChatUser } from "../app/ChatSlice";
import { setAllContact } from "../app/UserSlice";

function* chatSingleUserSaga(action) {
    const response = yield call (GetSingleUserWithIdAction,action.payload)
    console.log("chatSingleUserSaga---->", response);
    if(response.status===200){
        yield put(setSingleChatUser({singleChatUser:response?.data?.data}))
    }
}

function* allContactsSaga(action) {
  const response = yield call (GetAllContactsAction,action.payload)
  console.log("allContactsSaga---->", response);
  if(response?.status===200){
      yield put(setAllContact({allContacts:response?.data?.data}))
  }
}

export function* watchUser() {
  yield takeEvery("CHAT_SINGLE_USER_DETAIL", chatSingleUserSaga);
  yield takeEvery("GET_ALL_CONTACTS", allContactsSaga);
}
