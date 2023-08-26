import { call, put, takeEvery } from "redux-saga/effects";
import { GetAllChatsActions, createChatAction } from "../api/ChatAction";
import { setAllChats } from "../app/ChatSlice";

function* createChatSaga(action) {
  const response = yield call(createChatAction, action.payload);
}

function* getAllChatSaga(action) {
  try {
    const response = yield call(GetAllChatsActions, action.payload);
    // console.log("getAllChatSaga---->", response);
    if (response?.status === 200) {
      yield put(setAllChats({ allChats: response?.data?.data }));
    }
  } catch (error) {
    console.log(error);
  }
}

export function* watchChat() {
  yield takeEvery("CREATE_CHAT", createChatSaga);
  yield takeEvery("GET_ALL_CHAT", getAllChatSaga);
}
