import { createStore, combineReducers, applyMiddleware } from 'redux';
import { reducer as formReducer } from 'redux-form'
import thunkMiddleware from 'redux-thunk';

//Local
import uiReducer from './reducers/UIReducer'
import loginReducer from './reducers/LoginReducer'
import searchReducer from './reducers/SearchReducer'
import symbolViewReducer from './reducers/SymbolViewReducer'

const rootReducer = combineReducers({
  form: formReducer,
  ui: uiReducer,
  login: loginReducer,
  search:searchReducer,
  symbolView:symbolViewReducer,
});

const store = createStore(rootReducer,applyMiddleware(thunkMiddleware));
export default store;
