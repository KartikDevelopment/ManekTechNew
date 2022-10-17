import {takeLatest,takeEvery, call, put } from 'redux-saga/effects'
import CommonActions from "../action-types/common"
function* handleApiCall(action) {
    const { promise, onSuccessCallback, placeholderData } = action;
    const { START, SUCCESS, FAIL } = action.subtypes;
  
    yield put({ type: START, data: action.data });
  
    try {
      const response = yield call(promise);
      const result = yield response.data;
      yield put({
        type: SUCCESS,
        payload: placeholderData || result,
        data: action.data,
      });
  
      if (onSuccessCallback && _.isFunction(onSuccessCallback)) {
        yield call(onSuccessCallback);
      }
      // console.log('APi fff Fail due to authentication',result);
    } catch (errors) {
      yield put({ type: FAIL, errors, data: action.data });
      // user has logged in some where else hence logging him out.
  
     
      // console.log('APi Fail due to authentication',errors.response.data.message);
    }
}
export default function* () {
    yield takeEvery(CommonActions.COMMON_API_CALL, handleApiCall);
}
  