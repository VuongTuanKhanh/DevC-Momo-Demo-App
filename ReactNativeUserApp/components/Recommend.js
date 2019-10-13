import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {Image} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Octicons';
import Foundation from 'react-native-vector-icons/Foundation';
import {shortenText} from '../helper/utils';
import {FontAwesome} from '@expo/vector-icons';
var {height, width} = Dimensions.get ('window');

const Recommend = ({storeName, img, avrAmount, address, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <Image
          resizeMode="cover"
          source={{uri: img.substr (0, img.indexOf (','))}}
          style={styles.img}
          containerStyle={styles.img}
          PlaceholderContent={<ActivityIndicator />}
        />

        <View style={styles.textContainer}>
          <View style={{flexDirection: 'row'}}>
            <Text style={{fontSize: width * 0.035, fontWeight: '500'}}>
              {shortenText (storeName, 28)}
            </Text>
            <Icon
              name="verified"
              size={width * 0.033}
              color="green"
              style={{marginLeft: 5}}
            />
          </View>
          <View style={{flexDirection: 'row'}}>
            <Foundation
              name="marker"
              size={width * 0.032}
              color="green"
              style={{marginRight: 5}}
            />
            <Text style={{fontSize: width * 0.031}}>
              {shortenText (address)}
            </Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <FontAwesome
              name="money"
              size={width * 0.032}
              color="rgb(62, 241, 17)"
            />
            <Text style={{fontSize: width * 0.031}}>
              {' '}~ {avrAmount}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Recommend;

const styles = StyleSheet.create ({
  container: {
    flex: 1,
    flexDirection: 'row',
    height: height / 8,
    width: width,
    borderWidth: 1,
    borderColor: '#dddddd',
    borderRadius: 10,
    marginTop: 5,
  },
  textContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  img: {
    width: 100,
    borderRadius: 10,
    height: height / 8 - 2,
  },
});
