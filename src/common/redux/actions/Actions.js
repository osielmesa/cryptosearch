import axios from 'axios';
import {loginEndpoint, grantTypePassword, clientId} from '../../api'

import {HIDE_LOADING, SHOW_LOADING, LOGIN} from "./ActionTypes";

export const hideLoading = () => ({
  type: HIDE_LOADING,
});

export const showLoading = ({loadingText}) => ({
  type: SHOW_LOADING,
  loadingText:loadingText
});


export const login = ({ username, password }) => {

  return dispatch => {
    const data = {
      username,
      password,
      grant_type:grantTypePassword,
      client_id: clientId
    }
    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
    console.log(data)
    //debugger
    axios
      .post(loginEndpoint,data,config)
      .then(res => {
        console.log('Response: ',res)
        //dispatch(addTodoFailure(err.message));
      })
      .catch(err => {
        console.log('LoginAction error',err)
      });
  };
};
