import React from 'react';
import {View, Button} from 'react-native';
import {connect} from 'react-redux';
import styles from './styles';

import {MapView} from '@components';
import RangePicker from '../../components/MapView/RangePicker';

class Map extends React.PureComponent {
  render () {
    const {
      onRangeChange,
      onViewDetail,
      region,
      recommend: {recommends},
    } = this.props;
    return (
      <View style={styles.container}>
        <View
          style={{
            flex: 0.07,
            flexDirection: 'row',
            backgroundColor: '#ddd',
            justifyContent: 'flex-end',
          }}
        >
          <View style={{flex: 0.3}}>
            <RangePicker
              styles={styles.center}
              range={region.latitudeDelta}
              onRangeChange={onRangeChange}
            />
          </View>
        </View>
        <MapView
          recommends={recommends}
          onRangeChange={onRangeChange}
          onViewDetail={onViewDetail}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    region: state.user.region,
    recommend: state.recommend,
  };
};

export default connect (mapStateToProps) (Map);
