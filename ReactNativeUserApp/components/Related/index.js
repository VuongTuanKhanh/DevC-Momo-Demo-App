import React from 'react';
import {Text, View} from 'react-native';
import Recommend from '../Recommend';

const Related = ({storeName, img, avrAmount, address, onPress}) => {
  return (
    <View style={{backgroundColor: '#fff'}}>
      <Recommend
        storeName={storeName}
        img={img}
        avrAmount={avrAmount}
        address={address}
        onPress={onPress}
      />
    </View>
  );
};

export default Related;
