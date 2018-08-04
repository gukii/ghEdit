import React from 'react'

import { connect } from "react-redux"
// import { withRouter } from 'react-router-dom'
import { push } from 'react-router-redux' // goBack,
import { bindActionCreators } from 'redux'



import { TabBar  } from 'antd-mobile'


// feed
import MdSpeakerNotesOff from 'react-icons/lib/md/speaker-notes-off'  // looks like 'no feed' icon
import MdSpeakerNotes from 'react-icons/lib/md/speaker-notes' // feed icon

import FaCogs from 'react-icons/lib/fa/cogs'  // settings




import Home from '../home'
import Page2 from '../page2'
import Page3 from '../page3'
import Settings from '../settings'

//import FadeWrapper from '../../hoc/FadeWrapper'
//import { TransitionGroup } from 'react-transition-group'




// for screen-size determination i could use this HOC:
// https://www.npmjs.com/package/react-window-size

class TabScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      hidden: false,
      fullScreen: true,
      screenSize: { height: window.innerHeight-55, width: window.innerWidth },  // -50 because of the size of the tab-bar menu

    }

    //this.changeTab = this.changeTab.bind(this)
  }



  render() {
    const params = !!this.props.match.params && this.props.match.params.tabId ? this.props.match.params : { tabId: ':tab1' }

    console.log('this.props.match.params:', this.props.match.params)
    
    const screenHeight = this.state.screenSize.height? this.state.screenSize.height+'px' : '300px'
    //console.log('## screenHeight:', screenHeight)


    return (
      <div style={this.state.fullScreen ? { position: 'fixed', height: '100%', width: '100%', top: 0 } : { height: 400 }}>
        <TabBar
          unselectedTintColor="#949494"
          tintColor="#33A3F4"
          barTintColor="white"
          hidden={this.state.hidden}
        >



          <TabBar.Item
            title="Home"
            key="Tab1"
            icon={(<MdSpeakerNotesOff />)}
            selectedIcon={(<MdSpeakerNotes />)}
            badge={'X'}
            selected={params.tabId === ':tab1'}
            onPress={() => {
              this.props.changeTab(':tab1')
            }}


            data-seed="logId1"
          >

            <div style={{ paddingTop: 0, backgroundColor: 'white', height: screenHeight, textAlign: 'center', overflowY:'scroll' }}>
                <Home />
            </div>

          </TabBar.Item>




          <TabBar.Item
            title="Page2"
            key="Tab2"
            icon={(<MdSpeakerNotes />)}
            selectedIcon={(<MdSpeakerNotes />)}

            selected={params.tabId === ':tab2'}
            badge={'new'}
            onPress={() => {
              this.props.changeTab(':tab2')
            }}
            data-seed="logId2"
          >

            <div style={{ backgroundColor: 'white', height: screenHeight, textAlign: 'center', overflowY:'scroll' }}>
              <Page2 />
            </div>

          </TabBar.Item>






          <TabBar.Item
            title="Page3"
            key="Tab3"          
            icon={(<MdSpeakerNotes />)}
            selectedIcon={(<MdSpeakerNotes />)}

            selected={params.tabId === ':tab3'}
            onPress={() => {
              this.props.changeTab(':tab3')
            }}
            dot

            data-seed="logId3"
          >

            <div>
              <Page3 />
            </div>

          </TabBar.Item>




          <TabBar.Item
            icon={(<FaCogs />)}
            selectedIcon={(<FaCogs />)}
            title="Settings"
            key="Tab4"
            dot
            selected={params.tabId === ':tab4'}
            onPress={() => {
              this.props.changeTab(':tab4')
            }}
            data-seed="logId4"
          >

            <div>
              <Settings />
            </div>            

          </TabBar.Item>


        </TabBar>

      </div>
    );
  }
}

// typing links directly into address bar works, hover, pushing thru redux router does not.
// correct url typed into address bar: http://localhost:3001/#/tabScreens:tab3
// 

//export default TabScreen
const mapDispatchToProps = dispatch => bindActionCreators({
  changeTab: (tab) => push('/tabScreen'+tab) // push('/#'+tab)
}, dispatch)

export default connect(
  null,
mapDispatchToProps)(TabScreen)
