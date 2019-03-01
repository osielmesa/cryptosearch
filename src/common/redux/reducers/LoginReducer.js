import {
  SHOW_LOADING_LOGIN,
  HIDE_LOADING_LOGIN,
  SHOW_LOGIN_ERROR_MESSAGE,
  HIDE_LOGIN_ERROR_MESSAGE,
  UPDATE_USER_INFO
} from "../actions/ActionTypes";

const initialState = {
  loadingLogin: false,
  showLoginError:false,
  errorMessage:'',
  user:null
}

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_LOADING_LOGIN:
      return {
        ...state,
        loadingLogin: true
      }
    case HIDE_LOADING_LOGIN:
      return {
        ...state,
        loadingLogin: false
      }
    case SHOW_LOGIN_ERROR_MESSAGE:
      return {
        ...state,
        showLoginError: true,
        errorMessage: action.payload
      }
    case HIDE_LOGIN_ERROR_MESSAGE:
      return {
        ...state,
        showLoginError: false
      }
    case UPDATE_USER_INFO:
      return {
        ...state,
        user: action.payload
      }
    default:
      return state;
  }
}

export default loginReducer
