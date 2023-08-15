import { call, put, takeEvery } from "redux-saga/effects";
import { AccessTokenAction, AuthUserAction, loginUserAction } from "../api/authAction";
import { setAuthUser, setToken } from "../app/authSlice";
import { toast } from "react-toastify";

 function* loginSaga(action){
try {
    // console.log(action?.payload);
   const response =  yield call (loginUserAction,action?.payload)
   console.log("loginSaga resposnse",response);
   localStorage.setItem("User_email", action.payload.body.email);
   if(response.status===200){
        yield put({
            type:"ACCESS_TOKEN",
            payload:action?.payload?.body?.email
        })
        toast.success(response?.data?.message)
        action.payload.navigate("/chat")
   }
} catch (error) {
    toast.warning(error?.response?.data?.message)
}
}


function* accessTokenSaga(action){
    try {
        console.log(action?.payload);
       const response =  yield call (AccessTokenAction,action?.payload)
       console.log("accessTokenSaga resposnse",response);
       if(response.status===200){
        yield put(setToken({token:response?.data?.accessToken}))
       }
    } catch (error) {
        console.log(error)
    }
    }

    function* authUserSaga(action){
        try {
            console.log(action?.payload);
           const response =  yield call (AuthUserAction,action?.payload)
           console.log("authUserSaga resposnse",response);
           if(response.status===200){
            yield put(setAuthUser({authUser:response?.data?.authUser}))
           }
        } catch (error) {
            console.log(error.message)
        }
        }





export function* watchAuthAsync(){
    yield takeEvery("LOGIN",loginSaga)
    yield takeEvery("ACCESS_TOKEN",accessTokenSaga)
    yield takeEvery("AUTH_USER",authUserSaga)
    // yield takeEvery("LOGOUT",logoutSaga)
}