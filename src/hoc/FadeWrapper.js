import React from 'react'
import { CSSTransition } from 'react-transition-group'
//import Transition from 'react-transition-group/Transition';

const FadeWrapper = WrappedComponent => {
  return class FadeWrapper extends React.Component {

    state = { isIn:true }

    componentWillUnmount() {
      this.setState({ isIn: false })
    }
/*
    toggleEnterState = () => {
      this.setState({ isIn: true })
    }
*/
    render() {
      return (
        <CSSTransition
          timeout={this.props.timeout || 200}
          classNames="fade"
          in={this.state.isIn}
        >
            <WrappedComponent {...this.props} />
        </CSSTransition>
      )
    }
  }
}

export default FadeWrapper
