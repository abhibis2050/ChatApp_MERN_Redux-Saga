import { call, put, takeEvery } from "redux-saga/effects";
import { GetAllGroupsAction, GetGroupsByIdAction } from "../api/GroupAction";
import { setAllGroupDetailsById, setAllGroups } from "../app/GroupSlice";

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
    //   console.log("getGroupDetailsByIdSaga---->", response);
      if(response?.status===200){
        yield put(setAllGroupDetailsById({groupDetailsById:response?.data?.data}))
    }
    } catch (error) {
      console.log(error);
    }
  }

export function* watchGroup() {
  yield takeEvery("GET_ALL_GROUPS", getAllGroupsSaga);
  yield takeEvery("GET_GROUP_DETAIL_BY_ID", getGroupDetailsByIdSaga);
}
