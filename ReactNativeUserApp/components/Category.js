import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {Image} from 'react-native-elements';

const Category = ({name, imgUrl, cateSelected, onCateChange}) => (
  <TouchableOpacity onPress={() => onCateChange (name)}>
    <View
      style={[styles.container, cateSelected.indexOf(name) > -1 ? styles.selected : null]}
    >
      <View style={styles.pic}>
        <Image
          source={{uri: imgUrl}}
          style={{flex: 1, height: 80}}
          PlaceholderContent={<ActivityIndicator />}
        />
      </View>
      <View style={styles.text}>
        <Text>{name}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

export default Category;

const styles = StyleSheet.create ({
  container: {
    flex: 1,
    height: 100,
    width: 100,
    marginLeft: 5,
    borderWidth: 0.5,
    borderColor: '#dddddd',
  },
  pic: {
    flex: 0.8,
  },
  text: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selected: {
    borderWidth: 1,
    borderColor: '#FF0074',
  },
});
