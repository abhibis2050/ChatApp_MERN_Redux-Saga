import { call, put, takeEvery } from "redux-saga/effects";
import {
  GetAllContactsAction,
  GetAllFriendListAction,
  GetAllRecievedFriendRequestAction,
  GetAllSentFriendRequestAction,
  GetSingleUserWithIdAction,
} from "../api/UserAction";
import {} from "../app/ChatSlice";
import {
  setAllContact,
  setAllFriendList,
  setAllFriendRequestRecieved,
  setAllFriendRequestSent,
} from "../app/UserSlice";

// function* chatSingleUserSaga(action) {
//     // const response = yield call (GetSingleUserWithIdAction,action.payload)
//     // console.log("chatSingleUserSaga---->", response);
//     // if(response.status===200){
//     //     yield put(setSingleChatUser({OppositeChatUser:response?.data?.data}))
//     // }
// }

function* allContactsSaga(action) {
  const response = yield call(GetAllContactsAction, action.payload);
  console.log("allContactsSaga---->", response);
  if (response?.status === 200) {
    yield put(setAllContact({ allContacts: response?.data?.data }));
  }
}

function* getFriendListSaga(action) {
  try {
    const response = yield call(GetAllFriendListAction, action.payload);
    console.log("friendListSaga---->", response);
    if (response?.status === 200) {
      yield put(
        setAllFriendList({ allFriendList: response?.data?.data?.contacts })
      );
    }
  } catch (error) {
    console.log(error);
  }
}

function* getSentFriendRequestSaga(action) {
  try {
    const response = yield call(GetAllSentFriendRequestAction, action.payload);
    console.log("getSentFriendRequestSaga---->", response);
    if (response?.status === 200) {
      yield put(
        setAllFriendRequestSent({
          allFriendRequestSent: response?.data?.data?.friendRequestSent,
        })
      );
    }
  } catch (error) {
    console.log(error);
  }
}

function* getRecievedFriendRequestSaga(action) {
  try {
    const response = yield call(
      GetAllRecievedFriendRequestAction,
      action.payload
    );
    console.log("getRecievedFriendRequestSaga---->", response?.data);
    if (response?.status === 200) {
      yield put(
        setAllFriendRequestRecieved({
          allFriendRequestRecieved: response?.data?.data?.friendRequestRecieved,
        })
      );
    }
  } catch (error) {
    console.log(error);
  }
}
export function* watchUser() {
  // yield takeEvery("CHAT_SINGLE_USER_DETAIL", chatSingleUserSaga);
  yield takeEvery("GET_ALL_CONTACTS", allContactsSaga);
  yield takeEvery("GET_FRIENDLIST", getFriendListSaga);
  yield takeEvery("GET_ALL_FRIENDREQUEST_SENT", getSentFriendRequestSaga);
  yield takeEvery(
    "GET_ALL_FRIENDREQUEST_RECIEVED",
    getRecievedFriendRequestSaga
  );
}
