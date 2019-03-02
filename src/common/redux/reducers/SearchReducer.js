import {
  RETRIEVE_SYMBOLS_LIST,
} from "../actions/ActionTypes";

const initialState = {
  symbols:[]
}

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case RETRIEVE_SYMBOLS_LIST:
      return {
        ...state,
        symbols: action.payload
      }
    default:
      return state;
  }
}

export default searchReducer
