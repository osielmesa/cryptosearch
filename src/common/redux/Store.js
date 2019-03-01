import { createStore, combineReducers, applyMiddleware } from 'redux';
import { reducer as formReducer } from 'redux-form'
import thunkMiddleware from 'redux-thunk';

//Local
import uiReducer from './reducers/UIReducer'

const rootReducer = combineReducers({
  ui: uiReducer,
  form: formReducer
});

const store = createStore(rootReducer,applyMiddleware(thunkMiddleware));
export default store;
