import React, {PureComponent} from 'react';
import {View, Text, Platform, TouchableOpacity, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import MapView, {Marker} from 'react-native-maps';
import {FontAwesome} from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import Carousel from 'react-native-snap-carousel';
import {viewportWidth, viewportHeight} from '../../helper/utils';

import SliderEntry from '../../components/Carousel/SliderEntry';
import styles from './styles';
import Related from '../../components/Related';

class Detail extends PureComponent {
  _renderItem ({item, index}, parallaxProps) {
    return (
      <SliderEntry
        data={item}
        even={(index + 1) % 2 === 0}
        parallax={false}
        parallaxProps={parallaxProps}
      />
    );
  }

  openMap = () => {
    const {lat, long} = this.props.data;
    const url = `http://maps.apple.com/?ll=${lat},${long}`;
    const urlGG = `https://google.com/maps/place/${lat},${long}`;
    WebBrowser.openBrowserAsync (Platform.OS == 'ios' ? url : urlGG);
  };

  carouselData = data => {
    const images = data.imgUrl.split (',');
    const carouselArray = [];
    images.forEach (img => {
      carouselArray.push ({illustration: img});
    });
    return carouselArray;
  };

  _renderRelated = recommends => (
    <View style={styles.section}>
      <View style={styles.lineTitle}>
        <Text style={styles.ltitle}>Có thể bạn thích: </Text>
      </View>
      <View style={[styles.boxItems, styles.boxRelatedItems]}>
        {recommends.filter(x => x !== this.props.data).map ((item, i) => (
            <Related
              key={i}
              storeName={item.storeName}
              img={item.imgUrl}
              avrAmount={item.avrAmount}
              address={item.storeAddress}
              onPress={() => this.props.onRelatedClick (item, i)}
            />
          ))}
      </View>
    </View>
  );

  render () {
    const {data, recommends} = this.props;
    const carouselArray = this.carouselData (data);
    return (
      <ScrollView contentContainerStyle={{backgroundColor: '#ddd'}}>
        <View style={styles.headAddress}>
          <View style={styles.rowTitle}>
            <Carousel
              ref={c => {
                this._carousel = c;
              }}
              data={carouselArray}
              renderItem={this._renderItem}
              hasParallaxImages={true}
              sliderWidth={viewportWidth}
              itemWidth={viewportWidth - 60}
              autoplay={true}
              autoplayDelay={500}
              autoplayInterval={3000}
            />
          </View>
          <Text style={styles.postTitle}>
            {data.storeName}
          </Text>
          <View style={{paddingBottom: 10}}>
            <TouchableOpacity style={styles.row} onPress={this.openMap}>
              <FontAwesome name="map-marker" />
              <Text style={styles.label}>Địa chỉ</Text>
              <Text style={styles.text} numberOfLines={2}>
                {data.storeAddress}
              </Text>
            </TouchableOpacity>
            <View style={styles.row}>
              <FontAwesome name="money" />
              <Text style={styles.label}>Giá trung bình </Text>
              <Text style={styles.text} numberOfLines={2}>
                {data.avrAmount} VNĐ
              </Text>
            </View>
          </View>
          <View style={[styles.section, styles.sectionMap]}>
            <View style={{flexDirection: 'row'}}>
              <View style={[styles.lineTitle, styles.lineTitleMap]}>
                <FontAwesome name="map-marker" />
                <Text style={styles.ltitle}>{' '}Địa điểm</Text>
              </View>
              <TouchableOpacity
                style={styles.lineMapRight}
                onPress={this.openMap}
              >
                <Text style={styles.textMap}>{'Đi đến'}</Text>
              </TouchableOpacity>
            </View>
            <MapView
              style={{
                height: viewportHeight / 3,
                width: '100%',
                backgroundColor: '#00d077',
              }}
              loadingEnabled
              region={{
                latitude: data.lat,
                longitude: data.long,
                latitudeDelta: 0.004,
                longitudeDelta: 0.004,
              }}
            >
              <Marker coordinate={{latitude: data.lat, longitude: data.long}} />
            </MapView>
          </View>
          {recommends.length > 0 && this._renderRelated (recommends)}
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  return {
    recommends: state.recommend.recommends,
  };
};

export default connect (mapStateToProps) (Detail);
