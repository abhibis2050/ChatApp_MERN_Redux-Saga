import { call, put, takeEvery } from "redux-saga/effects";
import { SendOneToOneMessageAction, getAlloneToOneMessagesAction } from "../api/MessageAction";
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

    
function* oneToOneMessageSaga(action){
    try {
        console.log(action?.payload);
        const response =  yield call (SendOneToOneMessageAction,action?.payload)
        console.log("oneToOneMessageSaga resposnse",response);
    } catch (error) {
        console.log(error)
    }
    }






export function* watchMessage(){
    yield takeEvery("GET_ALL_ONE_TO_ONE_MESSAGE",allOneToOneMessageSaga)
    yield takeEvery("SEND_ONE_TO_ONE_MESSAGE",oneToOneMessageSaga)
}