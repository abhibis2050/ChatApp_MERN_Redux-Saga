import { call, put, takeEvery } from "redux-saga/effects";
import { getAlloneToOneMessagesAction } from "../api/MessageAction";
import { setAllSingleChatMessages } from "../app/messageSlice";



function* allOneToOneMessageSaga(action){
    try {
        console.log(action?.payload);
       const response =  yield call (getAlloneToOneMessagesAction,action?.payload)
    //    console.log("allOneToOneMessageSaga resposnse",response);
       if(response.status===200){
        yield put(setAllSingleChatMessages({allSingleChatMessages:response?.data?.messages}))
       }
    } catch (error) {
        console.log(error)
    }
    }






export function* watchMessage(){
    yield takeEvery("GET_ALL_ONE_TO_ONE_MESSAGE",allOneToOneMessageSaga)
}