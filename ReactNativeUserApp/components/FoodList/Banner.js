import React, {Component} from 'react';
import {connect} from 'react-redux';
import Slideshow from '../SlideShow';
import {ActivityIndicator, View, Dimensions} from 'react-native';
import {getBanner} from '../../redux/RecommedRedux';

class Banner extends Component {
  constructor (props) {
    super (props);

    this.state = {
      position: 1,
      interval: null,
    };
  }

  componentWillMount () {
    this.props.getBanner ();

    setTimeout (() => {
      this.setState ({
        interval: setInterval (() => {
          this.setState ({
            position: this.state.position === this.props.banners.length - 1
              ? 0
              : this.state.position + 1,
          });
        }, 3400),
      });
    }, 500);
  }

  componentWillUnmount () {
    clearInterval (this.state.interval);
  }

  onViewBannerDetail = (position) => {
    const banner = position.image
    const object = {
      storeAddress: banner.caption,
      storeName: banner.title,
      avrAmount: banner.avrAmount,
      imgUrl: banner.url,
      lat: banner.lat,
      long: banner.long
    }
    this.props.onViewDetail(object, Math.random())
  }

  render () {
    const {banners} = this.props;
    return banners.length > 0
      ? <Slideshow
          dataSource={banners}
          position={this.state.position}
          onPositionChanged={position => this.setState ({position})}
          onPress={this.onViewBannerDetail}
        />
      : <View
          style={{
            height: Dimensions.get ('window').width * (4 / 9),
            width: Dimensions.get ('window').width,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <ActivityIndicator size={50} />
        </View>;
  }
}
const mapStateToProps = state => {
  return {
    banners: state.recommend.banners,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getBanner: () => dispatch (getBanner ()),
  };
};

export default connect (mapStateToProps, mapDispatchToProps) (Banner);
