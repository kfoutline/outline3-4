import { takeLatest,call,put} from 'redux-saga/effects';

import Api from '@/api'
import {login,logout} from '../action/common'

function* checkLogin(){
    let user = localStorage.getItem('user');console.log('sage.user',user)
    if(!user) {
        return put(logout());
    }
    user = JSON.parse(user);

    // 解决刷新后redux数据丢失的问题
    yield put(login(user))

    let {Authorization} = user;

    let result = yield call(Api.get,'/user/verify',{},{headers:{Authorization}})
    if(result.status === 401){
        // token校验失败
        yield put(logout())
    }
}  

function * rootSaga(){
    yield takeLatest('CHECK_LOGIN_STATUS',checkLogin)
}

export default rootSaga;