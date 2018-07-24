import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import store, { history } from './store'
import App from './containers/app'
import registerServiceWorker from './registerServiceWorker';


import './index.css'
//import './styles/styles.css'


const target = document.querySelector('#root')

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
        <App />
    </ConnectedRouter>
  </Provider>,
  target
)
registerServiceWorker()



/*
if (window.FB === undefined) {
	console.log('windows.FB is undefined.. waiting 3 seconds for FB SDK to load..')

	setTimeout(function(){
	    console.log("finished waiting..")


		render(
		  <Provider store={store}>
		    <ConnectedRouter history={history}>
		      <div>
		        <App />
		      </div>
		    </ConnectedRouter>
		  </Provider>,
		  target
		)

	}, 3000)
}
*/
