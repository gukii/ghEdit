import React from 'react'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
//import FadeWrapper from '../../hoc/FadeWrapper'
import { GH_CREATE_FILE_REQ } from '../../reducers/github'


import { Button, NavBar, Icon } from 'antd-mobile'
import { LaunchFileDialog } from './launchFileDialog'



const Home = props => (
  <div>

    <NavBar
      mode="dark"
      leftContent="Back"
      rightContent={[
        <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
        <Icon key="1" type="ellipsis" />,
      ]}
    >NavBar</NavBar>

    <h1>Home</h1>

    <Button type="outline" onClick={ (e) => {
        //e.preventDefault()
        //e.stopPropagation()
        LaunchFileDialog(props.createFile)
      }
    }>Create File</Button>



    <p><button onClick={() => props.changePage()}>Go to Page2</button></p>


  </div>
)


/*
const mapStateToProps = state => ({

})
*/


const mapDispatchToProps = dispatch => bindActionCreators({
  changePage: () => push('/tabScreen:tab2'),
  createFile: ({fileName}) => {
      console.log('props createFile:', fileName)
      return {  type: GH_CREATE_FILE_REQ,
                payload: { ghFileName: fileName, fileContents: "..created by pressing a button.." }
              }
  }
}, dispatch)


/*
const mapDispatchToProps = dispatch => {
  return {
    changePage: () => dispatch(push('/tabScreens:tab2')),
    createFile: ({fileName}) => {
        console.log('props createFile:', fileName)
        dispatch({  type: GH_CREATE_FILE_REQ,
                    payload: { ghFileName: fileName, fileContents: "..created by pressing a button.." }
                })
    }
  }
}
*/


export default connect(
  null,
mapDispatchToProps)(Home)
