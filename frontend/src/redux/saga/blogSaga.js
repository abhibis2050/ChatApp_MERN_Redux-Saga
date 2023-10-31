import { call, put, takeEvery } from "redux-saga/effects";
import {
  SendGroupMessageAction,

} from "../api/MessageAction";
import { GetAllMyBlogsActions, createBlogAction, deleteBlogAction, editBlogAction, getAllBlogsBasedOnCategoryActions, getAllBlogsbyIdActions } from "../api/blogAction";
import { addBlog, deleteBlog, setMyBlogs, setSingleContactBlogs } from "../app/blogSlice";


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

  
  function* createBlogSaga(action) {
    try {
      console.log("createBlogSaga response",action)
      const response =yield call(createBlogAction, action?.payload);
      console.log("createBlogSaga response",response)
      if(response?.status ===201){
        yield put(addBlog({myBlogs:response?.data?.data}))
      }
    } catch (error) {
      console.log(error);
    }
  }

  function* getAllBlogsBasedOnCategorySaga(action) {
    try {
      const response =yield call(getAllBlogsBasedOnCategoryActions, action?.payload);
      console.log("getAllBlogsBasedOnCategorySaga",response)
      if(response?.status ===200){
        // yield put(setMyBlogs({myBlogs:response?.data?.data}))
      }
    } catch (error) {
      console.log(error);
    }
  }

  function* getAllBlogsbyIdSaga(action) {
    try {
      const response =yield call(getAllBlogsbyIdActions, action?.payload);
      console.log("GetAllMyBlogsresponse",response)
      if(response?.status ===200){
        yield put(setSingleContactBlogs({singleContactBlogs:response?.data?.data}))
      }
    } catch (error) {
      console.log(error);
    }
  }


  function* editBlogSaga(action) {
    try {
      const response = yield call(editBlogAction, action?.payload);

      console.log("editBlogSaga response",response)

      if(response?.status ===200){
        // yield put(editMyBlogs({editedBlog:response?.data?.data}))
      }
    } catch (error) {
      console.log(error);
    }
  }

  
  function* deleteBlogSaga(action) {
    try {
      const response = yield call(deleteBlogAction, action?.payload);

      console.log("deleteBlogSaga response",response)

      if(response?.status ===200){
        yield put(deleteBlog({deleteBlog:response?.data?.data}))
      }
    } catch (error) {
      console.log(error);
    }
  }

export function* watchBlog() {
  yield takeEvery("GET_ALL_MY_BLOGS", getAllMyBlogSaga);
  yield takeEvery("CREATE_BLOGS", createBlogSaga);
  yield takeEvery("EDIT_MY_BLOGS", editBlogSaga);
  yield takeEvery("DELETE_MY_BLOGS", deleteBlogSaga);
  yield takeEvery("GET_BLOGS_BY_ID", getAllBlogsbyIdSaga);
  yield takeEvery("GET_BLOGS_BY_CATEGORY", getAllBlogsBasedOnCategorySaga);

}
