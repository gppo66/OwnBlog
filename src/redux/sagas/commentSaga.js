import axios from 'axios';
import { push } from 'connected-react-router';
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import {
  COMMENT_DELETE_FAILURE,
  COMMENT_DELETE_REQUEST,
  COMMENT_DELETE_SUCCESS,
  COMMENT_LOADING_FAILURE,
  COMMENT_LOADING_REQUEST,
  COMMENT_LOADING_SUCCESS,
  COMMENT_UPLOADING_FAILURE,
  COMMENT_UPLOADING_REQUEST,
  COMMENT_UPLOADING_SUCCESS,
} from '../types';

// Load Comment

const loadCommentsAPI = (payload) => {
  console.log(payload, 'loadCommentAPI ID');
  return axios.get(`/api/post/${payload}/comments`);
};

function* loadComments(action) {
  try {
    const result = yield call(loadCommentsAPI, action.payload);
    console.log(result, ' comment result');
    yield put({
      type: COMMENT_LOADING_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    console.log(e);
    yield put({
      type: COMMENT_LOADING_FAILURE,
      payload: e,
    });
    yield push('/');
  }
}

function* watchLoadComments() {
  yield takeEvery(COMMENT_LOADING_REQUEST, loadComments);
}

// UpLoad Comment

const uploadCommentsAPI = (payload) => {
  console.log(payload.id, 'loadCommentAPI ID');
  return axios.post(`/api/post/${payload.id}/comments`, payload);
};

function* uploadComments(action) {
  try {
    console.log(action);
    const result = yield call(uploadCommentsAPI, action.payload);
    console.log(result, 'UploadComment');
    yield put({
      type: COMMENT_UPLOADING_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    console.log(e);
    yield put({
      type: COMMENT_UPLOADING_FAILURE,
      payload: e,
    });
    yield push('/');
  }
}
function* watchUpLoadComments() {
  yield takeEvery(COMMENT_UPLOADING_REQUEST, uploadComments);
}

// Comment delete
const DeleteCommentAPI = (payload) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const token = payload.token;

  if (token) {
    config.headers['x-auth-token'] = token;
  }
  return axios.delete(
    `/api/post/${payload.post_id}/comments/${payload.id}`,
    config,
  );
};

function* DeleteComment(action) {
  try {
    const result = yield call(DeleteCommentAPI, action.payload);
    console.warn(result, ' delete result data');
    yield put({
      type: COMMENT_DELETE_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: COMMENT_DELETE_FAILURE,
      payload: e,
    });
  }
}

function* watchDeleteComment() {
  yield takeEvery(COMMENT_DELETE_REQUEST, DeleteComment);
}

export default function* commentSaga() {
  yield all([
    fork(watchLoadComments),
    fork(watchUpLoadComments),
    fork(watchDeleteComment),
  ]);
}
