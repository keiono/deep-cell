import {Router, Route, browserHistory} from 'react-router'
import {syncHistoryWithStore} from 'react-router-redux'
import {Provider} from 'react-redux'

import ReactDOM from 'react-dom'
import React from 'react'

// Containers
import NetworkView from './containers/NetworkView'
import FrontPage from './containers/FrontPage'

// Store
import configure from './store'

const store = configure()
const history = syncHistoryWithStore(browserHistory, store)

// Start the application
ReactDOM.render(
  <Provider store={store}>
  <Router history={history}>

    <Route path="/" component={FrontPage}/>
    <Route path="/app" component={NetworkView}/>

  </Router>
</Provider>, document.getElementById('root'))
