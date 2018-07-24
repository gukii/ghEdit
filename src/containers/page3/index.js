import React from 'react'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'


import { Button, NavBar, Icon } from 'antd-mobile'


const Page3 = props => (
  <div>

    <NavBar
      mode="dark"
      leftContent="Back"
      rightContent={[
        <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
        <Icon key="1" type="ellipsis" />,
      ]}
    >NavBar</NavBar>

    <h1>Page3</h1>

    <Button type="primary">Button</Button>



    <p><button onClick={() => props.changePage()}>Go Home via redux</button></p>




  </div>
)

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => bindActionCreators({
  changePage: () => push('/')
}, dispatch)

export default connect(
  mapStateToProps,
mapDispatchToProps)(Page3)
