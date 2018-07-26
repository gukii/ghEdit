import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import counter from './counter'
import auth from './auth'
import github from './github'

export default combineReducers({
  routing: routerReducer,
  counter,
  auth,
  github,
})
