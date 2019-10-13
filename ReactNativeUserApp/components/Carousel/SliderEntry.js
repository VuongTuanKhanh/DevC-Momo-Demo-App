import React, {Component} from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import {ParallaxImage} from 'react-native-snap-carousel';
import styles from './styles';

export default class SliderEntry extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    parallax: PropTypes.bool,
    parallaxProps: PropTypes.object,
  };

  get image () {
    const {data: {illustration}, parallax, parallaxProps, even} = this.props;

    return parallax
      ? <ParallaxImage
          source={{uri: illustration}}
          containerStyle={styles.imageContainer}
          style={styles.image}
          parallaxFactor={0.35}
          showSpinner={true}
          {...parallaxProps}
        />
      : <Image source={{uri: illustration}} style={styles.image} />;
  }

  render () {
    return (
      <TouchableOpacity activeOpacity={1} style={styles.slideInnerContainer}>
        <View style={styles.shadow} />
        <View style={styles.imageContainer}>
          {this.image}
          <View style={styles.radiusMask} />
        </View>
      </TouchableOpacity>
    );
  }
}
