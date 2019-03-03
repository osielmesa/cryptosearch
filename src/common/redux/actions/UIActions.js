import {HIDE_LOADING, SHOW_LOADING, ORIENTATION_CHANGED} from "./ActionTypes";

export const hideLoading = () => ({
  type: HIDE_LOADING,
})

export const showLoading = (loadingText) => ({
  type: SHOW_LOADING,
  payload:loadingText
})

export const changeOrientation = ({orientation}) => ({
  type: ORIENTATION_CHANGED,payload:orientation
});
