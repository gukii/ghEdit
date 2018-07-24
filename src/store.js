import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import createSagaMiddleware from 'redux-saga'

//import createHistory from 'history/createBrowserHistory'
import createHistory from 'history/createHashHistory'
import rootReducer from './reducers'

import mySaga from './sagas/mySaga'

import { loadState, saveState } from './helpers/localStorage'
import throttle from 'lodash/throttle'
import { push } from 'react-router-redux'



export const history = createHistory()

// could be the same as initialState
// got saveState from Abramov:
// https://egghead.io/lessons/javascript-redux-persisting-the-state-to-the-local-storage

let persistedState = loadState()
if (!!persistedState) {
  // got persistedState.
} else {
  persistedState = { auth: {} }
}

console.log('persistedState loaded:', persistedState)
//persistedState = {...persistedState, graph:{}}
// if auth.authExpirationTS has passed.. where should i re-auth? probably not here..
// ... but here i could set re-auth-required flag in redux store..
// this is done now in the APP Component.



// create the saga middleware
const sagaMiddleware = createSagaMiddleware()

const enhancers = []

const middleware = [
  sagaMiddleware,
  //fbAuth,
  routerMiddleware(history),
]


if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.devToolsExtension

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension())
  }
}


const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers
)





const store = createStore(
  rootReducer,
  //initialState,
  persistedState,
  composedEnhancers
)



// then run the saga
sagaMiddleware.run(mySaga)



// temporary here..
export const storeSaveState = () => {
  saveState(store.getState() )
  console.log('storeSaveState executed')
}


// save state every time something gets saved into redux store
store.subscribe( throttle( () => {

    //saveState(store.getState() )  // turned off the store auto-save, for debugging purposes
    /*
    saveState({
      auth: store.getState().auth,
      graph: store.getState().graph,

    })

    console.log('# redux store saved..')

    */
  }, 1000)
)


if (!persistedState) {
  store.dispatch(push('/other'))
  //store.dispatch(push('/tabScreens'))

}




export default store
