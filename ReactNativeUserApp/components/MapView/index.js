import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Dimensions} from 'react-native';
import MapView, {Circle, Marker} from 'react-native-maps';
import {shortenText} from '../../helper/utils';
import {Entypo} from '@expo/vector-icons';
import {changeMapRegion} from '../../redux/UserRedux';
import {getRecommendByUserId} from '../../redux/RecommedRedux';
const radius = require ('../../range.json');
var width = Dimensions.get ('window').width;
var height = Dimensions.get ('window').height;
class Index extends Component {
  constructor () {
    super ();
    this.state = {
      flex: 0,
    };
  }

  onSetState = () => {
    setTimeout (() => {
      this.setState ({flex: 1});
    }, 10);
  };

  componentWillReceiveProps = () => {
    this._map.animateToRegion (this.props.user.region, 200);
  };

  onPressOtherRegion = event => {
    this.props.changeMapRegion (event.nativeEvent.coordinate);
    this.props.getRecommendByUserId();
  };

  getCircleRadius = delta => {
    const ra = radius.find (r => r.delta === delta);
    return ra.radius;
  };

  render () {
    const {user, recommends} = this.props;
    const radius = this.getCircleRadius (user.region.latitudeDelta);
    return (
      <MapView
        ref={ref => (this._map = ref)}
        onMapReady={this.onSetState}
        provider="google"
        style={{flex: this.state.flex, width, height}}
        region={user.region}
        showsMyLocationButton={true}
        showsUserLocation={true}
        followsUserLocation={true}
        onLongPress={this.onPressOtherRegion}
      >
        <Marker
          coordinate={{
            latitude: user.region.latitude,
            longitude: user.region.longitude,
          }}
          title={'Vị trí tâm'}
        >
          <Entypo name="pin" size={20} color="rgb(23,231,88)" />
        </Marker>
        {recommends.length > 0 &&
          recommends.map ((r, i) => (
            <Marker
              onCalloutPress={() => this.props.onViewDetail(r)}
              key={i}
              title={r.storeName}
              description={shortenText (r.storeAddress)}
              coordinate={{
                latitude: r.lat,
                longitude: r.long,
              }}
            />
          ))}
        <Circle
          key={(user.region.latitude + user.region.longitude).toString ()}
          center={user.region}
          radius={radius}
          strokeWidth={1}
          strokeColor={'#1a66ff'}
          fillColor={'rgba(230,238,255,0.5)'}
        />
      </MapView>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeMapRegion: region => dispatch (changeMapRegion (region)),
    getRecommendByUserId: () => dispatch (getRecommendByUserId ()),
  };
};

export default connect (mapStateToProps, mapDispatchToProps) (Index);
