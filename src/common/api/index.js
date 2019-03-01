export const baseUrl = 'https://api.staging.brokercloud.io/v1'

//Login
export const loginEndpoint = baseUrl + '/oauth/token'
export const grantTypePassword = 'password'
export const contentTypeLogin = 'application/x-www-form-urlencoded'
export const clientId = '844b0a54-c0af-11e7-abc4-cec278b6b50a'
export const applicationId = '345070b3-722f-4fd8-8940-5286c15b53df'
//watchList
export const contentTypeWatchList = 'application/json'

//User info
export const userInfoEndpoint = baseUrl + '/users/me'

//Symbol search
export const getSearchDataEndpoint = (userId) => {
  const symbolSearchPart1 = baseUrl + '/users/'
  const symbolSearchPart2 = '/symbols'
  return symbolSearchPart1 + userId + symbolSearchPart2
}

//Symbol chart
export const getSymbolChartEndpoint = (userId, symbolId) => {
  const symbolChartPart1 = baseUrl + '/users/'
  const symbolChartPart2 = '/symbols/'
  const symbolChartPart3 = '/charts'
  return symbolChartPart1 + userId + symbolChartPart2 + symbolId + symbolChartPart3
}

//Single symbol
export const getSingleSymbolEndpoint = (userId, symbolId) => {
  const singleSymbolPart1 = baseUrl + '/users/'
  const singleSymbolPart2 = '/symbols/'
  return singleSymbolPart1 + userId + singleSymbolPart2 + symbolId
}

//Application news
export const getApplicationNewsEndpoint = (offset) => {
  const appNewsPart1 = baseUrl + '/applications/'
  const appNewsPart2 = '/news/coinpulse/'
  const limit = '?limit=5&offset='+offset
  return appNewsPart1 + applicationId + appNewsPart2 + limit
}

//Favorites
export const getfavoriteDataEndpoint = (accountId) => {
  const favoritePart1 = baseUrl + '/accounts/'
  const favoritePart2 = '/watchlist'
  return favoritePart1 + accountId + favoritePart2
}

export const getUserAccountsEndpoint = (userId) => {
  const userAccountsPart1 = baseUrl + '/users/'
  const userAccountsPart2 = '/accounts'
  return userAccountsPart1 + userId + userAccountsPart2
}

export const watchListEndpoint = (accountId,symbolId) => {
  const watchListPart1 = baseUrl + '/accounts/'
  const watchListPart2 = '/watchlist/'
  return watchListPart1 + accountId + watchListPart2 + symbolId
}
