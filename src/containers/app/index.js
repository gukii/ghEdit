import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom'

import FadeWrapper from '../../hoc/FadeWrapper'
import Home from '../home'
import Page2 from '../page2'
import Page3 from '../page3'
import TabScreens from '../tabScreen'

import { connect } from "react-redux";

import { TransitionGroup } from 'react-transition-group'


class App extends Component {

  componentDidMount() {


  }

  render() {

    //             <Link to="/showPost/:{this.props.activePost}">Go to ShowPost</Link>:::
    //
    //  github static hosting has problems with react router.
    //  i already switched to hash history. might also need to add the public_url in front of the routing paths
    //  there s a hack to make react router work.. its hacky..
    //
    //     <Route exact path={`${process.env.PUBLIC_URL}/other/:contentId`} component={FadeWrapper(OtherPage)} />


    return(

      <TransitionGroup className='someClass'>
            <Route exact path="/" component={FadeWrapper(TabScreens)} />
            <Route exact path="/2" component={FadeWrapper(Page2)} />
            <Route exact path="/3" component={FadeWrapper(Page3)} />
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