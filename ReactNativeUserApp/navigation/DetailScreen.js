import React, {Component} from 'react';
import Detail from '../containers/Detail';

export default class DetailScreen extends Component {
  static navigationOptions = ({navigation}) => ({
    headerTintColor: '#333',
    tabBarVisible: false,
  });
  state = {item: {}};
  componentWillMount () {
    const {getParam} = this.props.navigation;
    const item = getParam ('item');
    this.setState ({item});
  }

  render () {
    const {item} = this.state;
    const {navigate} = this.props.navigation;
    return (
      <Detail
        data={item}
        onRelatedClick={(item, index) => {
          navigate ({routeName: 'detail', params: {item, index}, key: Math.random()});
        }}
      />
    );
  }
}
