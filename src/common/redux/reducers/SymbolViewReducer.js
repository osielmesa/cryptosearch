import {
  RETRIEVE_CHART_DATA,
  RETRIEVE_NEWS,
  CLEAN_NEWS
} from "../actions/ActionTypes";

const initialState = {
  chartData:[],
  offset: null,
  news:[]
}

const symbolViewReducer = (state = initialState, action) => {
  switch (action.type) {
    case RETRIEVE_CHART_DATA:
      return {
        ...state,
        chartData: action.payload
      }
    case RETRIEVE_NEWS:
      let news = state.news
      if(action.payload.news && action.payload.news.length > 0){
        news = [...news, ...action.payload.news]
      }
      return {
        ...state,
        news: news,
        offset: action.payload.offset
      }
    case CLEAN_NEWS:
      return {
        ...state,
        news: []
      }
    default:
      return state;
  }
}

export default symbolViewReducer
