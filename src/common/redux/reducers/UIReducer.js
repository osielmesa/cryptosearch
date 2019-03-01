import {HIDE_LOADING,SHOW_LOADING} from "../actions/ActionTypes";

const initialState = {
  loading: false,
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
        loadingText:action.loadingText
      };

    default:
      return state;
  }
};

export default uiReducer
