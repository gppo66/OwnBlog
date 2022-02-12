import { all, fork } from 'redux-saga/effects';
import axios from 'axios';

import authSaga from './authSaga';
import dotenv from 'dotenv';
import postSaga from './postSaga';
import commentSaga from './commentSaga';
dotenv.config();

axios.defaults.baseURL = process.env.REACT_APP_BASIC_SERVER_URL;

// * generator function 여러 값을 반환하는 문법
export default function* rootSaga() {
  yield all([fork(authSaga), fork(postSaga), fork(commentSaga)]);
}
