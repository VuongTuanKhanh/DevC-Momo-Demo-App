import React from 'react';
import {createStackNavigator, createBottomTabNavigator} from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import MapScreen from './MapScreen';
import UserScreen from './UserScreen';
import DetailScreen from './DetailScreen';

const MapStack = createStackNavigator ({
  map: {screen: MapScreen},
  detail: {screen: DetailScreen},
});
MapStack.navigationOptions = {
  header: null,
  tabBarIcon: ({tintColor, focused}) => (
    <TabBarIcon
      name={'ios-information-circle-outline'}
      tintColor={tintColor}
      focused={focused}
    />
  ),
};

const UserStack = createStackNavigator ({
  User: UserScreen,
});

UserStack.navigationOptions = {
  tabBarIcon: ({focused}) => (
    <TabBarIcon focused={focused} name={'ios-person'} />
  ),
};

UserStack.path = '';

const tabNavigator = createBottomTabNavigator (
  {
    MapStack,
    UserStack,
  },
  {
    tabBarPosition: 'bottom',
    swipeEnabled: false,
    animationEnabled: true,
    tabBarOptions: {
      showIcon: true,
      showLabel: false,
      style: {
        backgroundColor: '#f6f6f6',
      },
    },
    lazy: true,
  }
);

tabNavigator.path = '';

export default tabNavigator;
