import {
  CATEGORY_FIND_FAILURE,
  CATEGORY_FIND_REQUEST,
  CATEGORY_FIND_SUCCESS,
  POSTS_LOADING_FAILURE,
  POSTS_LOADING_REQUEST,
  POSTS_LOADING_SUCCESS,
  POSTS_WRITE_FAILURE,
  POSTS_WRITE_REQUEST,
  POSTS_WRITE_SUCCESS,
  POST_DETAIL_LOADING_FAILURE,
  POST_DETAIL_LOADING_REQUEST,
  POST_DETAIL_LOADING_SUCCESS,
  POST_EDIT_LOADING_FAILURE,
  POST_EDIT_LOADING_REQUEST,
  POST_EDIT_LOADING_SUCCESS,
  POST_EDIT_UPLOADING_FAILURE,
  POST_EDIT_UPLOADING_REQUEST,
  POST_EDIT_UPLOADING_SUCCESS,
  SEARCH_FAILURE,
  SEARCH_REQUEST,
  SEARCH_SUCCESS,
} from '../types';

const initialState = {
  isAuthenticated: null,
  posts: [],
  postDetail: '',
  postCount: '',
  loading: false,
  error: '',
  creatorId: '',
  categoryFindResult: '',
  title: '',
  searchBy: '',
  searchResult: '',
};

// eslint-disable-next-line
export default function (state = initialState, action) {
  switch (action.type) {
    case POSTS_LOADING_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case POSTS_LOADING_SUCCESS:
      return {
        ...state,
        posts: [...state.posts, ...action.payload.postFindResult],
        categoryFindResult: action.payload.categoryFindResult,
        postCount: action.payload.postCount,
        loading: false,
      };
    case POSTS_LOADING_FAILURE:
      return {
        ...state,
        loading: false,
      };
    case POSTS_WRITE_REQUEST:
      return {
        ...state,
        posts: [],
        loading: true,
      };
    case POSTS_WRITE_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case POSTS_WRITE_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case POST_DETAIL_LOADING_REQUEST:
      return {
        ...state,
        posts: [],
        loading: true,
      };
    case POST_DETAIL_LOADING_SUCCESS:
      return {
        ...state,
        postDetail: action.payload,
        creatorId: action.payload.creator._id,
        title: action.payload.title,
        loading: false,
      };
    case POST_DETAIL_LOADING_FAILURE:
      return {
        ...state,
        loading: false,
      };
    case POST_EDIT_LOADING_REQUEST:
      return {
        ...state,
        posts: [],
        loading: true,
      };
    case POST_EDIT_LOADING_SUCCESS:
      return {
        ...state,
        postDetail: action.payload,
        loading: false,
      };
    case POST_EDIT_LOADING_FAILURE:
      return {
        ...state,
        loading: false,
      };
    case POST_EDIT_UPLOADING_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case POST_EDIT_UPLOADING_SUCCESS:
      return {
        ...state,
        posts: action.payload,
        isAuthenticated: true,
        loading: false,
      };
    case POST_EDIT_UPLOADING_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case CATEGORY_FIND_REQUEST:
      return {
        ...state,
        posts: [],
        loading: true,
      };
    case CATEGORY_FIND_SUCCESS:
      return {
        ...state,
        categoryFindResult: action.payload,
        loading: false,
      };
    case CATEGORY_FIND_FAILURE:
      return {
        ...state,
        categoryFindResult: action.payload,
        loading: false,
      };
    case SEARCH_REQUEST:
      return {
        ...state,
        posts: [],
        searchBy: action.payload,
        loading: true,
      };
    case SEARCH_SUCCESS:
      return {
        ...state,
        searchBy: state.searchBy,
        searchResult: action.payload,
        loading: false,
      };
    case SEARCH_FAILURE:
      return {
        ...state,
        searchResult: action.payload,
        loading: false,
      };
    default:
      return state;
  }
}
