import axios from 'axios';
import { push } from 'connected-react-router';
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import {
  CLEAR_ERROR_FAILURE,
  CLEAR_ERROR_REQUEST,
  CLEAR_ERROR_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  PASSWORD_EDIT_UPLOADING_FAILURE,
  PASSWORD_EDIT_UPLOADING_REQUEST,
  PASSWORD_EDIT_UPLOADING_SUCCESS,
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  USER_LOADING_FAILURE,
  USER_LOADING_REQUEST,
  USER_LOADING_SUCCESS,
} from '../types';

// Login

const loginUserAPI = (loginData) => {
  console.log(loginData, 'loginData');
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  return axios.post('api/auth', loginData, config);
};

function* loginUser(action) {
  try {
    const result = yield call(loginUserAPI, action.payload);
    console.log(result);
    yield put({
      type: LOGIN_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: LOGIN_FAILURE,
      payload: e.response,
    });
  }
}

function* watchLoginUser() {
  yield takeEvery(LOGIN_REQUEST, loginUser);
}

//LOGOUT

function* logoutUser(action) {
  try {
    yield put({
      type: LOGOUT_SUCCESS,
    });
  } catch (e) {
    yield put({
      type: LOGOUT_FAILURE,
    });
    console.log(e);
  }
}

function* watchLogoutUser() {
  yield takeEvery(LOGOUT_REQUEST, logoutUser);
}

// User Loading

const userLoadingAPI = (token) => {
  console.log(token, ' user loading token');
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  if (token) {
    config.headers['x-auth-token'] = token;
  }
  return axios.get('api/auth/user', config);
};

function* userLoading(action) {
  try {
    console.log(action, ' user Loading ');
    const result = yield call(userLoadingAPI, action.payload);
    yield put({
      type: USER_LOADING_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: USER_LOADING_FAILURE,
      payload: e.response,
    });
  }
}

function* watchuserLoading() {
  yield takeEvery(USER_LOADING_REQUEST, userLoading);
}

// REGISTER

const registerUserAPI = (registerdata) => {
  console.log(registerdata, 'registerdata');
  return axios.post('api/user', registerdata);
};

function* registerUser(action) {
  try {
    const result = yield call(registerUserAPI, action.payload);
    console.log(result, 'RegisterUser Data');
    yield put({
      type: REGISTER_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: REGISTER_FAILURE,
      payload: e.response,
    });
  }
}

function* watchregisterUser() {
  yield takeEvery(REGISTER_REQUEST, registerUser);
}

// CLEAR ERROR

function* clearError() {
  try {
    yield put({
      type: CLEAR_ERROR_SUCCESS,
    });
  } catch (e) {
    yield put({
      type: CLEAR_ERROR_FAILURE,
    });
  }
}

function* watchclearError() {
  yield takeEvery(CLEAR_ERROR_REQUEST, clearError);
}

// Edit Password

const EditPasswordAPI = (payload) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const token = payload.token;

  if (token) {
    config.headers['x-auth-token'] = token;
  }
  return axios.post(`/api/user/${payload.userName}/profile`, payload, config);
};

function* EditPassword(action) {
  try {
    console.warn(action.payload, 'EditPassword');
    const result = yield call(EditPasswordAPI, action.payload);
    yield put({
      type: PASSWORD_EDIT_UPLOADING_SUCCESS,
      payload: result,
    });
  } catch (e) {
    console.log(e.response, 'e.response');
    yield put({
      type: PASSWORD_EDIT_UPLOADING_FAILURE,
      payload: e.response.data,
    });
  }
}

function* watchEditPassword() {
  yield takeEvery(PASSWORD_EDIT_UPLOADING_REQUEST, EditPassword);
}
export default function* authSaga() {
  yield all([
    fork(watchLoginUser),
    fork(watchLogoutUser),
    fork(watchuserLoading),
    fork(watchregisterUser),
    fork(watchclearError),
    fork(watchEditPassword),
  ]);
}
