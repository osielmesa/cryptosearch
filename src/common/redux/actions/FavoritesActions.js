import {contentTypeWatchList, getfavoriteDataEndpoint, getUserAccountsEndpoint, watchListEndpoint} from '../../api'
import {RETRIEVE_FAVORITES_SYMBOLS_LIST} from "./ActionTypes"
import {showErrorToast} from "../../components"
import {logout} from "./LoginActions"

export const retrieveFavoriteSymbols = (symbols) => ({
  type: RETRIEVE_FAVORITES_SYMBOLS_LIST,
  payload:symbols
})

export const getFavorites = ({accountId,token}) => {
  return dispatch => {
    const url = getfavoriteDataEndpoint(accountId);
    const config = {
      method: 'GET',
      headers: {
        'Authorization': token
      }
    }
    fetch(url,config).then(res => {
      res.json().then(jsonResponse => {
        if(jsonResponse.code && jsonResponse.code !== 200 && jsonResponse.message){
          console.log('ERROR: ',jsonResponse)

        }else {

        }
      })
    }).catch(error => {
      console.log('ERROR: ',error)
    })
  }
}

export const getUserAccounts = ({userId,token}) => {
  return dispatch => {
    const url = getUserAccountsEndpoint(userId)
    const config = {
      method: 'GET',
      headers: {
        'Authorization': token
      }
    }
    fetch(url,config).then(res => {
      res.json().then(jsonResponse => {
        if(jsonResponse.code && jsonResponse.code !== 200 && jsonResponse.message){
          console.log('ERROR: ',jsonResponse)
        }else {
          console.log(jsonResponse)
        }
      })
    }).catch(error => {
      console.log('ERROR: ',error)
    })
  }
}

export const setFavorite = ({accountId,token, symbolId, following}) => {
  return dispatch => {
    const url = watchListEndpoint(accountId,symbolId)
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
        if(jsonResponse.code && jsonResponse.code !== 200 && jsonResponse.message){
          console.log('ERROR: ',jsonResponse)
        }else {
          console.log(jsonResponse)
        }
      })
    }).catch(error => {
      console.log('ERROR: ',error)
    })
  }
}

