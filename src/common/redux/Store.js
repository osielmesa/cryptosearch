import { createStore, combineReducers, applyMiddleware } from 'redux';
import { reducer as formReducer } from 'redux-form'
import thunkMiddleware from 'redux-thunk';

//Local
import uiReducer from './reducers/UIReducer'
import loginReducer from './reducers/LoginReducer'

const rootReducer = combineReducers({
  ui: uiReducer,
  login: loginReducer,
  form: formReducer,
});

const store = createStore(rootReducer,applyMiddleware(thunkMiddleware));
export default store;
