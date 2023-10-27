import { call, put, takeEvery } from "redux-saga/effects";
import {
  SendGroupMessageAction,

} from "../api/MessageAction";
import { GetAllMyBlogsActions } from "../api/blogAction";
import { setMyBlogs } from "../app/blogSlice";


  function* getAllMyBlogSaga(action) {
    try {
      const response =yield call(GetAllMyBlogsActions, action?.payload);
      console.log("GetAllMyBlogsresponse",response)
      if(response?.status ===200){
        yield put(setMyBlogs({myBlogs:response?.data?.data}))
      }
    } catch (error) {
      console.log(error);
    }
  }

export function* watchBlog() {
  yield takeEvery("GET_ALL_MY_BLOGS", getAllMyBlogSaga);

}
