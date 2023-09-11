import { call, put, takeEvery } from "redux-saga/effects";
import {
    GetAllGroupMessagesAction,
  SendGroupMessageAction,
  SendOneToOneMessageAction,
  getAlloneToOneMessagesAction,
} from "../api/MessageAction";
import { setAllGroupMessages, setAllSingleChatMessages } from "../app/messageSlice";

function* allOneToOneMessageSaga(action) {
  try {
    const response = yield call(getAlloneToOneMessagesAction, action?.payload);
    //    console.log("allOneToOneMessageSaga resposnse",response);
    if (response.status === 200) {
      yield put(
        setAllSingleChatMessages({
          allSingleChatMessages: response?.data?.messages,
        })
      );
    }
  } catch (error) {
    console.log(error);
  }
}

function* oneToOneMessageSaga(action) {
  try {
    yield call(SendOneToOneMessageAction, action?.payload);
  } catch (error) {
    console.log(error);
  }
}


function* getAllGroupMessageSaga(action) {
    try {
      console.log(action?.payload);
      const response = yield call(GetAllGroupMessagesAction, action?.payload);
      console.log("getAllGroupMessageSaga resposnse", response);
      if (response.status === 200) {
        yield put(
            setAllGroupMessages({
                allGroupMessages:response?.data?.messages,
          })
        );
      }
    } catch (error) {
      console.log(error);
    }
  }

  function* sendGroupMessageSaga(action) {
    try {
      const response =yield call(SendGroupMessageAction, action?.payload);
      console.log("sendGroupMessageSaga",response)
    } catch (error) {
      console.log(error);
    }
  }

export function* watchMessage() {
  yield takeEvery("GET_ALL_ONE_TO_ONE_MESSAGE", allOneToOneMessageSaga);
  yield takeEvery("SEND_GROUP_MESSAGE", sendGroupMessageSaga);
  yield takeEvery("GET_ALL_GROUP_MESSAGE", getAllGroupMessageSaga);
  yield takeEvery("SEND_ONE_TO_ONE_MESSAGE", oneToOneMessageSaga);
}
