import React, {Component} from 'react';
import {
  Dimensions,
  StyleSheet,
  Platform,
  ActivityIndicator,
} from 'react-native';
import {Feather} from '@expo/vector-icons';
import {TabView, SceneMap} from 'react-native-tab-view';

import {connect} from 'react-redux';

import {TabBar} from '@components';
import ListFood from '../containers/FoodList';
import Map from '../containers/Map';
import {getRecommendByUserId} from '../redux/RecommedRedux';
import {changeMapRange} from '../redux/UserRedux';
const {width} = Dimensions.get ('window');

class MapScreen extends Component {
  static navigationOptions = ({navigation}) => ({header: null});
  constructor (props) {
    super (props);
    this.state = {
      index: 0,
      routes: [
        {
          key: 'first',
          title: 'List',
          icon: 'list',
        },
        {
          key: 'second',
          title: 'Map',
          icon: 'map-pin',
        },
      ],
    };
  }

  componentWillMount () {
    this.props.getRecommendByUserId ();
  }

  onRangeChange = value => {
    this.props.onRangeChange (value);
    this.props.getRecommendByUserId ();
  };

  MapView = () => {
    const {navigate} = this.props.navigation;
    return (
      <Map
        onRangeChange={this.onRangeChange}
        onViewDetail={(item, index) => {
          navigate ('detail', {item, index, backToRoute: 'map'});
        }}
      />
    );
  };

  ListView = () => {
    const {navigate} = this.props.navigation;
    return (
      <ListFood
        onViewDetail={(item, index) => {
          navigate ('detail', {item, index, backToRoute: 'map'});
        }}
      />
    );
  };

  _renderIcon = ({route}) => (
    <Feather name={route.icon} size={24} color="#ccc" />
  );
  _renderTabBar = props => {
    return (
      <TabBar
        {...props}
        indicatorStyle={styles.indicator}
        renderIcon={this._renderIcon}
        style={styles.tabbar}
        tabStyle={styles.tabStyle}
        labelStyle={styles.label}
      />
    );
  };
  render () {
    const {isLoading} = this.props.recommend;
    if (isLoading) {
      return (
        <ActivityIndicator
          size="large"
          style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
        />
      );
    }
    return (
      <TabView
        navigationState={this.state}
        style={styles.container}
        renderTabBar={this._renderTabBar}
        renderIcon={this._renderIcon}
        renderScene={SceneMap ({first: this.ListView, second: this.MapView})}
        onIndexChange={index => this.setState ({index})}
        initialLayout={{
          width: Dimensions.get ('window').width,
        }}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    recommend: state.recommend,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getRecommendByUserId: () =>
      dispatch (getRecommendByUserId ()),
    onRangeChange: range => dispatch (changeMapRange (range)),
  };
};

export default connect (mapStateToProps, mapDispatchToProps) (MapScreen);

const styles = StyleSheet.create ({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    elevation: 0,
    borderWidth: 0,
  },
  tabbar: {
    color: '#333',
    backgroundColor: '#fff',
    ...Platform.select ({
      ios: {
        // remove the line under
        shadowOpacity: 0,
      },
      android: {
        paddingTop: 30,
        marginBottom: 10,
        elevation: 0,
      },
    }),
  },

  label: {
    color: '#333',
    margin: 0,
    ...Platform.select ({
      ios: {
        marginTop: -15,
      },
      android: {},
    }),
  },

  indicator: {
    backgroundColor: '#333',
    height: 2,
    borderRadius: 3,
    width: 30,
    marginLeft: width * 0.25 - 15,
  },
});
