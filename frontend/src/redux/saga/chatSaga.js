import { call, put, takeEvery } from "redux-saga/effects";
import { GetAllChatsActions, createChatAction } from "../api/ChatAction";
import { setAllChats, setOppositeChatUser } from "../app/ChatSlice";
import { GetSingleUserWithIdAction } from "../api/UserAction";

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

function* oppositeChatUserDetail(action) {
  const response = yield call (GetSingleUserWithIdAction,action.payload)
  console.log("oppositeChatUserDetail---->", response);
  if(response.status===200){

      // yield put(setOppositeChatUser({oppositeChatUser:response?.data?.data}))
  }
}



export function* watchChat() {
  yield takeEvery("CREATE_CHAT", createChatSaga);
  yield takeEvery("OPPOSITE_CHAT_USER_DETAIL", oppositeChatUserDetail);
  yield takeEvery("GET_ALL_CHAT", getAllChatSaga);
}
