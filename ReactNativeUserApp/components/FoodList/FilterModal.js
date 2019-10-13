import React from 'react';
import {View, Modal, Text, TouchableOpacity, ScrollView} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import styles from './styles';
import Category from '../Category';
const ranges = require ('../../range.json');

const FilterModal = ({
  visible,
  onClose,
  rangeSelected,
  onChangeRange,
  onConfirm,
  cate,
  onCateChange,
  cateSelected,
}) => (
  <Modal
    visible={visible}
    animationType="slide"
    style={styles.filterModalContainer}
  >
    <View style={styles.fitlerModal}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <TouchableOpacity onPress={onClose}>
          <Ionicons name="ios-arrow-round-back" size={32} />
        </TouchableOpacity>
        <TouchableOpacity onPress={onConfirm}>
          <Ionicons name="md-checkbox-outline" size={32} />
        </TouchableOpacity>
      </View>
      <Text style={styles.textBold}>Vùng: </Text>
      <View style={styles.rangesContainer}>
        {ranges.map ((item, i) => (
          <TouchableOpacity
            key={i}
            style={[
              styles.rangeSelect,
              item.delta === rangeSelected && styles.selected,
            ]}
            onPress={() => onChangeRange (item.delta)}
          >
            <Text>{item.value}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text style={styles.textBold}>Danh mục: </Text>

      <View style={{height: 100, marginTop: 10}}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {cate.data.length > 0 &&
            cate.data.map ((ct, i) => (
              <Category
                key={i}
                name={ct.name}
                imgUrl={ct.imgUrl}
                cateSelected={cateSelected}
                onCateChange={onCateChange}
              />
            ))}
        </ScrollView>
      </View>
    </View>
  </Modal>
);

export default FilterModal;
