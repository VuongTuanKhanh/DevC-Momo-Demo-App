import React from 'react';
import {Picker} from 'react-native';
const ranges = require ('../../range.json');

const RangePicker = ({styles, range, onRangeChange}) => (
  <Picker style={styles} selectedValue={range} onValueChange={onRangeChange}>
    {ranges.map ((item, i) => (
      <Picker.Item key={i} label={item.value} value={item.delta} />
    ))}
  </Picker>
);

export default RangePicker;
