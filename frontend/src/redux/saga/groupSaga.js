import { call, put, takeEvery } from "redux-saga/effects";
import { CreateGroupAction, GetAllGroupsAction, GetGroupsByIdAction, RemovefromGroupAction, RemovefromGroupAdminAction, UpdateAsGroupAdminAction, uploadGroupProfileIconAction } from "../api/GroupAction";
import {  setAllGroups, setCreateGroup, setSelectedGroupDetails } from "../app/GroupSlice";

function* getAllGroupsSaga(action) {
  try {
    const response = yield call(GetAllGroupsAction, action.payload);
    console.log("getAllGroupsSaga---->", response);
    if(response?.status===200){
        yield put(setAllGroups({allGroups:response?.data?.data}))
    }
  } catch (error) {
    console.log(error);
  }
}

function* getGroupDetailsByIdSaga(action) {
    try {
      const response = yield call(GetGroupsByIdAction, action.payload);
      // console.log("getGroupDetailsByIdSaga---->", response);
      if(response?.status===200){
        yield put(setSelectedGroupDetails({selectedGroupDetails:response?.data?.data}))
    }
    } catch (error) {
      console.log(error);
    }
  }

  function* uploadGroupProfileIconSaga(action) {
    try {
      const response = yield call(uploadGroupProfileIconAction, action.payload);
      // console.log("getRecievedFriendRequestIdSaga---->", response);
      // if(response.status===200){
        
      // }
  
    } catch (error) {
      console.log(error);
    }
  }


  function* UpdateAsGroupAdminIdSaga(action) {
    try {
      const response = yield call(UpdateAsGroupAdminAction, action.payload);
      // console.log("getRecievedFriendRequestIdSaga---->", response);
      // if(response.status===200){
        
      // }
  
    } catch (error) {
      console.log(error);
    }
  }
  
  
  function* RemoveFromGroupAdminIdSaga(action) {
    try {
      const response = yield call(RemovefromGroupAdminAction, action.payload);
      // console.log("getRecievedFriendRequestIdSaga---->", response);
      // if(response.status===200){
        
      // }
  
    } catch (error) {
      console.log(error);
    }
  }

   
  function* RemoveFromGroupSaga(action) {
    try {
      const response = yield call(RemovefromGroupAction, action.payload);
      console.log("RemoveFromGroupSaga---->", response);
      // if(response.status===200){
        
      // }
  
    } catch (error) {
      console.log(error);
    }
  }

  function* getCreateGroup(action) {
    try {
      const response = yield call(CreateGroupAction, action.payload);
      console.log("getCreateGroup---->", response);
      if(response.status===201){
        yield put(setCreateGroup({newGroup:response?.data?.data}))
      }
  
    } catch (error) {
      console.log(error);
    }
  }



export function* watchGroup() {
  yield takeEvery("CREATE_GROUP", getCreateGroup);
  yield takeEvery("GET_ALL_GROUPS", getAllGroupsSaga);
  yield takeEvery("GET_GROUP_DETAIL_BY_ID", getGroupDetailsByIdSaga);
  yield takeEvery("UPLOAD_GROUP_PROFILE_ICON", uploadGroupProfileIconSaga);
  yield takeEvery("SET_AS_GROUP_ADMIN", UpdateAsGroupAdminIdSaga);
  yield takeEvery("REMOVE_AS_GROUP_ADMIN", RemoveFromGroupAdminIdSaga);
  yield takeEvery("REMOVE_FROM_GROUP", RemoveFromGroupSaga);

}
