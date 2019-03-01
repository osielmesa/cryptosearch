
import {getSearchDataEndpoint} from '../../api'
import {RETRIEVE_SYMBOLS_LIST} from "./ActionTypes";
import {showErrorToast} from "../../components";
import {logout} from "./LoginActions";

export const getSymbolSearch = ({userId,token}) => {
  return dispatch => {
    const url = getSearchDataEndpoint(userId);
    const config = {
      method: 'GET',
      headers: {
        'Authorization': token
      }
    }
    fetch(url,config).then(res => {
      res.json().then(jsonResponse => {
        if(jsonResponse.code && jsonResponse.code !== 200 && jsonResponse.message){
          dispatch(logout())
          showErrorToast('Imposible to fetch data. Please check internet connection and try again!')
        }else {
          dispatch(retrieveSymbols(jsonResponse))
        }
      })
    }).catch(error => {
      dispatch(logout())
      showErrorToast('Imposible to fetch data. Please check internet connection!')
    })
  }
}

export const retrieveSymbols = (symbols) => ({
  type: RETRIEVE_SYMBOLS_LIST,
  payload:symbols
})


