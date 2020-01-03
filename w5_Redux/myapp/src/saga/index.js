import { call, put, takeEvery, takeLatest,delay } from 'redux-saga/effects'
import Api from '@/api'

// worker Saga : 将在 USER_FETCH_REQUESTED action 被 dispatch 时调用
function* fetchUser(action) {console.log('fetchUser -> hello saga')
   try {
      const user = yield call(Api.fetchUser, action.payload.userId);
      yield put({type: "USER_FETCH_SUCCEEDED", user: user});
   } catch (e) {
      yield put({type: "USER_FETCH_FAILED", message: e.message});
   }
}

function* helloSaga(){
    yield console.log('hello saga');
}

function* testNum(){console.log('ttt')
    // 副作用代码
    let res = yield 100;console.log('res:',res)
    yield delay(1000);console.log('delay')
    yield put({type:'DO_TEST'})
}

/*
  在每个 `USER_FETCH_REQUESTED` action 被 dispatch 时调用 fetchUser
  允许并发（译注：即同时处理多个相同的 action）
*/
function* rootSaga() {
  yield takeEvery("USER_FETCH_REQUESTED", fetchUser);
  yield takeLatest("HELLO_SAGA", helloSaga);
  yield takeLatest("DO_TEST_ASYNC", testNum);
}

/*
  也可以使用 takeLatest

  不允许并发，dispatch 一个 `USER_FETCH_REQUESTED` action 时，
  如果在这之前已经有一个 `USER_FETCH_REQUESTED` action 在处理中，
  那么处理中的 action 会被取消，只会执行当前的
*/
// function* rootSaga() {
//   yield takeLatest("USER_FETCH_REQUESTED", fetchUser);
// }



export default rootSaga;