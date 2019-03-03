import {HIDE_LOADING,SHOW_LOADING, ORIENTATION_CHANGED} from "../actions/ActionTypes";

const initialState = {
  loading: false,
  loadingText:''
};

 const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case HIDE_LOADING:
      return {
        ...state,
        loading: false,
        loadingText:''
      };

    case SHOW_LOADING:
      return {
        ...state,
        loading: true,
        loadingText:action.payload
      };
    case ORIENTATION_CHANGED:
      return {
        ...state,
        orientation: action.payload
      };

    default:
      return state;
  }
};

export default uiReducer
