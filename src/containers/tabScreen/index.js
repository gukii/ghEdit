import React from 'react'

import { connect } from "react-redux"
import { withRouter } from 'react-router-dom'
import { goBack, push } from 'react-router-redux'
import { bindActionCreators } from 'redux'



import { TabBar  } from 'antd-mobile'


// feed
import MdSpeakerNotesOff from 'react-icons/lib/md/speaker-notes-off'  // looks like 'no feed'
import MdSpeakerNotes from 'react-icons/lib/md/speaker-notes'



import Home from '../home'
import Page2 from '../page2'
import Page3 from '../page3'

import FadeWrapper from '../../hoc/FadeWrapper'
import { TransitionGroup } from 'react-transition-group'




// for screen-size determination i could use this HOC:
// https://www.npmjs.com/package/react-window-size

class TabScreens extends React.Component {

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
            data-seed="logId"
          >

            <div style={{ backgroundColor: 'white', height: screenHeight, textAlign: 'center', overflowY:'scroll' }}>
              <Page2 />
            </div>

          </TabBar.Item>






          <TabBar.Item
            icon={(<MdSpeakerNotes />)}
            selectedIcon={(<MdSpeakerNotes />)}
            title="Page3"
            key="Tab3"
            dot
            selected={params.tabId === ':tab3'}
            onPress={() => {
              this.props.changeTab(':tab3')
            }}
          >

            <Page3 />




          </TabBar.Item>


        </TabBar>

      </div>
    );
  }
}

//export default TabScreens

const mapDispatchToProps = dispatch => bindActionCreators({
  changeTab: (tab) => push('/tabScreens'+tab)
}, dispatch)

export default connect(
  null,
mapDispatchToProps)(TabScreens)


/*

            icon={
              <MdSpeakerNotesOff style={{
                  width: '22px',
                  height: '22px'
                }}
                badge={'X'}
              />}

*/



// overflow-y:scroll
/*

  renderContent(pageText) {
    return (
      <div style={{ backgroundColor: 'white', height: '100%', textAlign: 'center' }}>
        <div style={{ paddingTop: 60 }}>Clicked “{pageText}” tab， show “{pageText}” information</div>
        <a style={{ display: 'block', marginTop: 40, marginBottom: 20, color: '#108ee9' }}
          onClick={(e) => {
            e.preventDefault();
            this.setState({
              hidden: !this.state.hidden,
            });
          }}
        >
          Click to show/hide tab-bar
        </a>
        <a style={{ display: 'block', marginBottom: 600, color: '#108ee9' }}
          onClick={(e) => {
            e.preventDefault();
            this.setState({
              fullScreen: !this.state.fullScreen,
            });
          }}
        >
          Click to switch fullscreen
        </a>
      </div>
    );
  }
*/
