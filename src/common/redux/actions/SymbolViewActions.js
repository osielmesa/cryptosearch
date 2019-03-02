import {getSingleSymbolEndpoint, getSymbolChartEndpoint, getApplicationNewsEndpoint} from "../../api";
import {showErrorToast} from "../../components";
import {CLEAN_NEWS, RETRIEVE_CHART_DATA, RETRIEVE_NEWS} from "./ActionTypes";

export const getSymbolChart = ({userId,symbolId, token}) => {
  return dispatch => {
    const url = getSymbolChartEndpoint(userId,symbolId)
    const config = {
      method: 'GET',
      headers: {
        'Authorization': token
      }
    }
    fetch(url,config).then(res => {
      res.json().then(jsonResponse => {
        if(jsonResponse.code && jsonResponse.code !== 200 && jsonResponse.message){
          showErrorToast('Unable to fetch chart data!')
          console.log('ERROR: ',jsonResponse)
        }else {
          dispatch({type:RETRIEVE_CHART_DATA,payload:jsonResponse})
        }
      })
    }).catch(error => {
      showErrorToast('Unable to fetch chart data!')
      console.log('ERROR: ',error)
    })
  }
}

export const getSingleSymbol = ({userId,symbolId, token}) => {
  return dispatch => {
    const url = getSingleSymbolEndpoint(userId,symbolId);
    const config = {
      method: 'GET',
      headers: {
        'Authorization': token
      }
    }
    fetch(url,config).then(res => {
      res.json().then(jsonResponse => {
          console.log(jsonResponse)
      })
    }).catch(error => {
      console.log('ERROR: ',error)
    })
  }
}

export const getApplicationNews = (token,offset) => {
  return dispatch => {
    const url = getApplicationNewsEndpoint(offset)
    const config = {
      method: 'GET',
      headers: {
        'Authorization': token
      }
    }
    fetch(url,config).then(res => {
      res.json().then(jsonResponse => {
        if(jsonResponse.results){
          offset += jsonResponse.results.length
          dispatch(retrieveNews(jsonResponse.results,offset))
        }
      }).catch(error => {
        console.log('ERROR: ',error)
      })
    }).catch(error => {
      console.log('ERROR: ',error)
    })
  }
}

export const retrieveNews = (news,offset) => ({
  type: RETRIEVE_NEWS,
  payload:{news,offset}
})

export const cleanNews = () => ({
  type: CLEAN_NEWS,
})


