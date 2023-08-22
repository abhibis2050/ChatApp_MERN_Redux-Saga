import { call, put, takeEvery } from "redux-saga/effects";
import { AccessTokenAction, AuthUserAction, loginUserAction, registerUserAction } from "../api/authAction";
import { setAuthUser, setAuthUserLoading, setToken } from "../app/authSlice";
import { toast } from "react-toastify";


function* registerSaga(action){
    try {
        console.log(action?.payload);
       const response =  yield call (registerUserAction,action?.payload)
       console.log("registerUserAction resposnse",response);
    //    if(response.status===201){
           
    //    }
    } catch (error) {
        // toast.warning(error?.response?.data?.message)
    }
    }


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
            yield put(setAuthUserLoading({authUserLoading:true}))
            console.log(action?.payload);
           const response =  yield call (AuthUserAction,action?.payload)
           console.log("authUserSaga resposnse",response);
           if(response.status===200){
            yield put(setAuthUser({authUser:response?.data?.authUser}))
            yield put(setAuthUserLoading({authUserLoading:false}))
           }
        } catch (error) {
            console.log(error)
        }
        }





export function* watchAuthAsync(){
    yield takeEvery("REGISTER",registerSaga)
    yield takeEvery("LOGIN",loginSaga)
    yield takeEvery("ACCESS_TOKEN",accessTokenSaga)
    yield takeEvery("AUTH_USER",authUserSaga)
    // yield takeEvery("LOGOUT",logoutSaga)
}