import React from 'react'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { Button, NavBar, Icon, Carousel, WingBlank } from 'antd-mobile'

// 'https://i.imgur.com/Pa5nZvr.jpg',

class Page2 extends React.Component {
  state = {
    data: ['https://i.imgur.com/wyv6qVY.jpg', 'https://i.imgur.com/UUVHsU5.jpg'],
    imgHeight: 100,
  }
  componentDidMount() {
    // simulate img loading
    setTimeout(() => {
      this.setState({
        data: ['https://i.imgur.com/wyv6qVY.jpg', 'https://i.imgur.com/UUVHsU5.jpg', 'https://i.imgur.com/Lyh1goF.jpg', 'https://i.imgur.com/4TUFeRY.jpg', 'https://i.imgur.com/ihQ48Ru.jpg'],
      });
    }, 100);
  }
  render() {
    return (
      <span>

      <NavBar
        mode="dark"
        leftContent="Back"
        rightContent={[
          <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
          <Icon key="1" type="ellipsis" />,
        ]}
      >NavBar</NavBar>

      <h3>Page2 - Carousel</h3>

      <WingBlank>
        <Carousel
          autoplay={false}
          infinite
          beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
          afterChange={index => console.log('slide to', index)}
        >
          {this.state.data.map(val => (
            <a
              key={val}
              href="http://www.bucuo.com/"
              style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
            >
              <img
                src={val}
                alt=""
                style={{ width: '100%', verticalAlign: 'top' }}
                onLoad={() => {
                  // fire window resize event to change height
                  window.dispatchEvent(new Event('resize'));
                  this.setState({ imgHeight: 'auto' });
                }}
              />
            </a>
          ))}
        </Carousel>
      </WingBlank>

      <br />

      <WingBlank>
        <Button type="outline">Button</Button>
      </WingBlank>


      </span>
    );
  }
}



const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => bindActionCreators({
  changePage: () => push('/')
}, dispatch)

export default connect(
  mapStateToProps,
mapDispatchToProps)(Page2)
