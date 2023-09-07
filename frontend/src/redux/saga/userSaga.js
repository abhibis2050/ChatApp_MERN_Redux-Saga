import { call, put, takeEvery } from "redux-saga/effects";
import {
  AcceptFriendRequestAction,
  CancelRecivedFriendRequestAction,
  CancelSendFriendRequestAction,
  GetAllContactsAction,
  GetAllFriendIdAction,
  GetAllFriendListAction,
  GetAllRecievedFriendRequestAction,
  GetAllRecievedFriendRequestIdAction,
  GetAllSentFriendRequestAction,
  GetAllSentFriendRequestIdAction,
  GetSingleUserWithIdAction,
  UnfriendAction,
} from "../api/UserAction";
import {} from "../app/ChatSlice";
import {
  setAllContact,
  setAllFriendList,
  setAllFriendListId,
  setAllFriendRequestRecieved,
  
  setAllFriendRequestRecievedId,
  
  setAllFriendRequestSent,
  setAllFriendRequestSentId,

} from "../app/UserSlice";

// function* chatSingleUserSaga(action) {
//     // const response = yield call (GetSingleUserWithIdAction,action.payload)
//     // console.log("chatSingleUserSaga---->", response);
//     // if(response.status===200){
//     //     yield put(setSingleChatUser({OppositeChatUser:response?.data?.data}))
//     // }
// }



function* acceptFriendRequestSaga(action) {
  try {
    const response = yield call(AcceptFriendRequestAction, action.payload);
    console.log("acceptFriendRequestSaga---->", response);
  } catch (error) {
    console.log(error);
  }
}
function* allContactsSaga(action) {
  const response = yield call(GetAllContactsAction, action.payload);
  // console.log("allContactsSaga---->", response);
  if (response?.status === 200) {
    yield put(setAllContact({ allContacts: response?.data?.data }));
  }
}

function* getFriendListSaga(action) {
  try {
    const response = yield call(GetAllFriendListAction, action.payload);
    // console.log("friendListSaga---->", response);
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
    // console.log("getSentFriendRequestSaga---->", response);
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
    // console.log("getRecievedFriendRequestSaga---->", response?.data);
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

function* getFriendListIdSaga(action) {
  try {
    const response = yield call(GetAllFriendIdAction, action.payload);
    // console.log("friendListSaga---->", response);
    if (response?.status === 200) {
      yield put(
        setAllFriendListId({ allFriendListId: response?.data?.data?.contacts })
      );
    }
  } catch (error) {
    console.log(error);
  }
}

function* getSentFriendRequestIdSaga(action) {
  try {
    const response = yield call(GetAllSentFriendRequestIdAction, action.payload);
    // console.log("getSentFriendRequestIdSaga---->", response);
    if (response?.status === 200) {
      yield put(
        setAllFriendRequestSentId({ allFriendRequestSentId: response?.data?.data?.friendRequestSent })
      );
    }
  } catch (error) {
    console.log(error);
  }
}


function* getRecievedFriendRequestIdSaga(action) {
  try {
    const response = yield call(GetAllRecievedFriendRequestIdAction, action.payload);
    // console.log("getRecievedFriendRequestIdSaga---->", response);
    if (response?.status === 200) {
      yield put(
        setAllFriendRequestRecievedId({ allFriendRequestRecievedId: response?.data?.data?.friendRequestRecieved })
      );
    }
  } catch (error) {
    console.log(error);
  }
}


function* cancelSendFriendRequestSaga(action) {
  try {
    const response = yield call(CancelSendFriendRequestAction, action.payload);
    console.log("getRecievedFriendRequestIdSaga---->", response);

  } catch (error) {
    console.log(error);
  }
}



function* cancelRecievedFriendRequestSaga(action) {
  try {
    const response = yield call(CancelRecivedFriendRequestAction, action.payload);
    // console.log("getRecievedFriendRequestIdSaga---->", response);

  } catch (error) {
    console.log(error);
  }
}



function* UnfriendSaga(action) {
  try {
    const response = yield call(UnfriendAction, action.payload);
    // console.log("getRecievedFriendRequestIdSaga---->", response);

  } catch (error) {
    console.log(error);
  }
}



export function* watchUser() {
  // yield takeEvery("CHAT_SINGLE_USER_DETAIL", chatSingleUserSaga);
  yield takeEvery("ACCEPT_FRIEND_REQUEST", acceptFriendRequestSaga);
  yield takeEvery("GET_ALL_CONTACTS", allContactsSaga);
  yield takeEvery("GET_FRIENDLIST", getFriendListSaga);
  yield takeEvery("GET_ALL_FRIENDREQUEST_SENT", getSentFriendRequestSaga);
  yield takeEvery(
    "GET_ALL_FRIENDREQUEST_RECIEVED", getRecievedFriendRequestSaga
  );
  yield takeEvery("GET_FRIENDLIST_ID", getFriendListIdSaga);
  yield takeEvery("GET_ALL_FRIENDREQUEST_SENT_ID", getSentFriendRequestIdSaga);
  yield takeEvery(
    "GET_ALL_FRIENDREQUEST_RECIEVED_ID", getRecievedFriendRequestIdSaga
  );
  yield takeEvery("CANCEL_FRIENDREQUEST_SENT", cancelSendFriendRequestSaga);
  yield takeEvery("CANCEL_FRIENDREQUEST_RECIEVED", cancelRecievedFriendRequestSaga);
  yield takeEvery("UNFRIEND", UnfriendSaga);
}
