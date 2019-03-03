
import {getSearchDataEndpoint, setSymbolWatchListEndpoint, contentTypeWatchList} from '../../api'
import {RETRIEVE_SYMBOLS_LIST} from "./ActionTypes";
import {showErrorToast, showToast} from "../../components";
import {logout, getWatchList} from "./LoginActions";

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

export const setSymbolWatchList = ({accountId,token, symbolId, following, symbolName, userId}) => {

  return dispatch => {
    const url = setSymbolWatchListEndpoint(accountId,symbolId)
    const config = {
      method: 'PUT',
      headers: {
        'Authorization': token,
        'Content-Type': contentTypeWatchList
      },
      body: JSON.stringify({
        following: following,
      }),
    }
    fetch(url,config).then(res => {
      res.json().then(jsonResponse => {
        if(jsonResponse.code && jsonResponse.code !== 200){
          showErrorToastFromSetSymbolToWatchList(symbolName,following)
          console.log('Error: ', jsonResponse)
        }else {
          dispatch(getWatchList({accountId,token}))
          dispatch(getSymbolSearch({userId,token}))
          let message = symbolName + ' has been added to following list.'
          if(!following){
            message = symbolName + ' has been removed from following list.'
          }
          showToast(message)
        }
      }).catch(error => {
        showErrorToastFromSetSymbolToWatchList(symbolName,following)
        console.log('ERROR: ',error)
      })
    }).catch(error => {
      showErrorToastFromSetSymbolToWatchList(symbolName,following)
      console.log('ERROR: ',error)
    })
  }
}

const showErrorToastFromSetSymbolToWatchList = (symbolName, following) =>{
  let message = symbolName + ' cannot be added to following list.'
  if(!following){
    message = symbolName + ' cannot be removed from following list.'
  }
  showErrorToast(message)
}

export const retrieveSymbols = (symbols) => ({
  type: RETRIEVE_SYMBOLS_LIST,
  payload:symbols
})


