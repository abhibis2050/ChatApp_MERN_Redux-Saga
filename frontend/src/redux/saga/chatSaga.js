import { call, put, takeEvery } from "redux-saga/effects";
import { GetAllChatsActions, createChatAction } from "../api/ChatAction";
import {
  setAllChats,
  setOppositeChatUser,
  setSelectedChat,
  updateAllChats,
} from "../app/ChatSlice";
import { GetSingleUserWithIdAction } from "../api/UserAction";
import { setSideBarIsActive } from "../app/UserSlice";

function* createChatSaga(action) {
  try {
    const response = yield call(createChatAction, action.payload);
    console.log("createChatSaga response", response);
    if (response.status === 201) {
      yield put(
        setSideBarIsActive({
          message: true,
          group: false,
          contact: false,
          notification: false,
          profile: false,
        })
      );
      yield put(
        updateAllChats({
          chat: {
            _id: response?.data?.data?._id,
            sender: action.payload?.body?.userTwo,
            oppositeId: action.payload?.oppositeId,
          },
        })
      );
      yield put(
        setSelectedChat({
          selectedSingleChat: {
            _id: response?.data?.data?._id,
            sender: action.payload?.body?.userTwo,
            oppositeId: action.payload?.oppositeId,
          },
        })
      );
    }
  } catch (error) {
    console.log(error);
  }
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
  const response = yield call(GetSingleUserWithIdAction, action.payload);
  console.log("oppositeChatUserDetail---->", response);
  if (response.status === 200) {
    // yield put(setOppositeChatUser({oppositeChatUser:response?.data?.data}))
  }
}

export function* watchChat() {
  yield takeEvery("CREATE_CHAT", createChatSaga);
  yield takeEvery("OPPOSITE_CHAT_USER_DETAIL", oppositeChatUserDetail);
  yield takeEvery("GET_ALL_CHAT", getAllChatSaga);
}
