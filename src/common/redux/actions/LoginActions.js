import * as Keychain from 'react-native-keychain';

import {
  loginEndpoint,
  grantTypePassword,
  clientId,
  contentTypeLogin,
  userInfoEndpoint,
  getUserAccountsEndpoint,
  getWatchlistDataEndpoint
} from '../../api'
import {
  HIDE_LOADING_LOGIN,
  SHOW_LOADING_LOGIN,
  SHOW_LOGIN_ERROR_MESSAGE,
  HIDE_LOGIN_ERROR_MESSAGE,
  UPDATE_USER_INFO, LOGOUT,
  RETRIEVE_ACCOUNTS,
  RETRIEVE_WATCH_LIST
} from "./ActionTypes";

import {hideLoading, showLoading} from "./UIActions";
import {retrieveSymbols} from "./SearchActions";

export const showLoadingLogin = () => ({
  type: SHOW_LOADING_LOGIN
})

export const hideLoadingLogin = () => ({
  type: HIDE_LOADING_LOGIN
})

export const showLoginErrorMessage = (text) => ({
  type: SHOW_LOGIN_ERROR_MESSAGE,
  payload: text
})

export const hideLoginErrorMessage = () => ({
  type: HIDE_LOGIN_ERROR_MESSAGE
})

export const updateUserInfo = (user,token) => ({
  type: UPDATE_USER_INFO,
  payload: {user,token}
})

export const login = ({ username, password }) => {
  return dispatch => {
    dispatch(showLoadingLogin())
    const details = {
      'username': username,
      'password': password,
      'grant_type': grantTypePassword,
      'client_id': clientId
    };
    let formBody = [];
    for (const property in details) {
      const encodedKey = encodeURIComponent(property);
      const encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    const config = {
      method: 'POST',
      headers: {
        'Content-Type': contentTypeLogin,
      },
      body: formBody
    }
    fetch(loginEndpoint, config)
      .then(res => {
        res.json().then(jsonResponse => {
          if(jsonResponse.code && jsonResponse.code !== 200 && jsonResponse.message){
            dispatch(showLoginErrorMessage(jsonResponse.message))
            dispatch(hideLoadingLogin())
            return;
          }
          dispatch(getUserInfo(jsonResponse, true, true))
        }).catch(error => {
          console.log('ERROR: ',error)
        })
      }).catch(error => {
        dispatch(showLoginErrorMessage('Error: Please check the internet connection!'))
        dispatch(hideLoadingLogin())
      })
  }
}
export const getUserInfo = (authorization, saveDataEnabled, showloginErrorEnabled) => {
  let bearer = null
  if(authorization.token_type && authorization.accessToken){
    bearer = authorization.token_type + ' '+authorization.accessToken
  }
  return dispatch => {
    if(!bearer){
      dispatch(hideLoadingLogin())
      dispatch(showLoginErrorMessage('Error: An error has occurred!'))
      return;
    }
    const url = userInfoEndpoint;
    const config = {
      method: 'GET',
      headers: {
        'Authorization': bearer
      }
    }
    fetch(url,config).then(res => {
      res.json().then(jsonResponse => {
        if(jsonResponse.code && jsonResponse.code !== 200 && jsonResponse.message){
          if(showloginErrorEnabled){
            dispatch(showLoginErrorMessage(jsonResponse.message))
          }
          dispatch(hideLoadingLogin())
          dispatch(hideLoading())
        }else {
          dispatch(updateUserInfo(jsonResponse, bearer,authorization.accessToken))
          dispatch(getUserAccounts({userId:jsonResponse.id,token:bearer}))
          dispatch(hideLoadingLogin())
          dispatch(hideLoginErrorMessage())
          dispatch(hideLoading())
          if(saveDataEnabled){
            dispatch(saveSecurityData(authorization.token_type, authorization.accessToken))
          }
        }
      }).catch(error => {
        console.log('ERROR: ',error)
      })
    }).catch(error => {
      if(showloginErrorEnabled){
        dispatch(showLoginErrorMessage('Error: Please check the internet connection!'))
      }
      dispatch(hideLoadingLogin())
      dispatch(hideLoading())
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
        if(jsonResponse.code && jsonResponse.code !== 200){
          console.log('ERROR: ',jsonResponse)
        }else {
          if(jsonResponse.length > 0){
            dispatch(retrieveAccounts(jsonResponse))
            dispatch(getWatchList({accountId:jsonResponse[0].id,token}))
          }
        }
      }).catch(error => {
        console.log('ERROR: ',error)
      })
    }).catch(error => {
      console.log('ERROR: ',error)
    })
  }
}

export const getWatchList = ({accountId,token}) => {
  return dispatch => {
    const url = getWatchlistDataEndpoint(accountId);
    const config = {
      method: 'GET',
      headers: {
        'Authorization': token
      }
    }
    fetch(url,config).then(res => {
      res.json().then(jsonResponse => {
        if(jsonResponse.code && jsonResponse.code !== 200){
          console.log('ERROR: ',jsonResponse)
        }else {
          dispatch(retrieveWatchList(jsonResponse))
        }
      }).catch(error => {
        console.log('ERROR: ',error)
      })
    }).catch(error => {
      console.log('ERROR: ',error)
    })
  }
}

const saveSecurityData = (token_type,accessToken) => {
  return dispatch => {
     Keychain.resetGenericPassword().then(reseted => {
       Keychain.setGenericPassword(token_type, accessToken).then(saved => {
         console.log('Security data has been saved.')
       })
     }).catch(error => {
       console.log('Keychain couldn\'t be accessed!', error);
     })
  }
}

export const deleteSecurityData = () => {
  return dispatch => {
    Keychain.resetGenericPassword().then(reseted => {
      console.log('Security data has been removed.')
    }).catch(error => {
      console.log('Keychain couldn\'t be accessed!', error);
    })
  }
}

export const getSecurityData = () => {
  return dispatch => {
    dispatch(showLoading('Loading...Please wait!'))
    try {
      Keychain.getGenericPassword().then(credentials => {
        if (credentials.username && credentials.password) {
          const token_type = credentials.username
          const accessToken = credentials.password
          dispatch(getUserInfo({token_type,accessToken},false, false))
        }else{
          dispatch(hideLoading())
          console.log('There is not security data saved!');
        }
      }).catch(error => {
        dispatch(hideLoading())
        console.log('Keychain couldn\'t be accessed!', error);
      })
    } catch (error) {
      dispatch(hideLoading())
      console.log('Keychain couldn\'t be accessed!', error);
    }
  }
}

export const retrieveAccounts = (accounts) => ({
  type: RETRIEVE_ACCOUNTS,
  payload: accounts
})

export const retrieveWatchList = (watchList) => ({
  type: RETRIEVE_WATCH_LIST,
  payload: watchList
})

export const logout = () => {
  return dispatch => {
    dispatch(retrieveSymbols([]))
    dispatch(deleteSecurityData())
    dispatch({type:LOGOUT})
  }
}

