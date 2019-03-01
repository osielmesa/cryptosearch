import {
  RETRIEVE_FAVORITES_SYMBOLS_LIST,
} from "../actions/ActionTypes";

const initialState = {
  symbols:[]
}

const favoritesReducer = (state = initialState, action) => {
  switch (action.type) {
    case RETRIEVE_FAVORITES_SYMBOLS_LIST:
      return {
        ...state,
        symbols: action.payload
      }
    default:
      return state;
  }
}

export default favoritesReducer
