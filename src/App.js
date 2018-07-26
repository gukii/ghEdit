import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom'

import FadeWrapper from './hoc/FadeWrapper'
import Home from './containers/home'
import Page2 from './containers/page2'
import Page3 from './containers/page3'
import TabScreens from './containers/tabScreen'

import { connect } from "react-redux";

import { TransitionGroup } from 'react-transition-group'


class App extends Component {

  componentDidMount() {


  }

  render() {

    return(

      <TransitionGroup className='someClass'>
            <Route exact path="/" component={FadeWrapper(TabScreens)} />
            <Route exact path="/2" component={FadeWrapper(Page2)} />
            <Route exact path="/3" component={FadeWrapper(Page3)} />
            <Route exact path="/home" component={FadeWrapper(Home)} />
            <Route exact path="/tabScreens:tabId" component={TabScreens} />
            <Route exact path="/tabScreens" component={(TabScreens)} />
      </TransitionGroup>

    ) // return
  } // render
} // class

//


const mapStateToProps = state => {
  return {
    auth: state.auth
    //isConnected: state.auth.isConnected,
    //feed: state.graph.feed,
    //feed_attachments: state.graph.feed_attachments,
    //activePost: state.ui.activePost,
    //authExpirationTS: state.auth.authExpirationTS,
    //fbCredentials: state.auth.fbCredentials,
    //page_id: state.auth.page_id,
  }
}



const mapDispatchToProps = dispatch => {
  return {

  }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
