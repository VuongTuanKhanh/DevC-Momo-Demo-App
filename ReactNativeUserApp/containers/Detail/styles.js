import {StyleSheet, Platform, Dimensions} from 'react-native';
const {width, height} = Dimensions.get ('window');
const vw = width / 100;
const vh = height / 100;
export default StyleSheet.create ({
  slider: {
    marginTop: 15,
    overflow: 'visible', // for custom animations
  },
  title: {
    paddingHorizontal: 30,
    backgroundColor: 'transparent',
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  mt10: {
    marginTop: 10,
  },
  row: {
    flexDirection: 'row',
    paddingTop: 4,
    paddingBottom: 8,
    paddingLeft: 14,
    alignItems: 'center',
    justifyContent: 'flex-start',
    zIndex: 9999,
  },
  headAddress: {
    zIndex: 9999,
    backgroundColor: 'rgba(255,255,255,1)',
    paddingTop: 10,
    width,
  },
  rowTitle: {
    flexDirection: 'row',
    width,
    marginHorizontal: 0,
    marginTop: 0,
  },
  postTitle: {
    color: 'rgba(0, 0, 0, 1)',
    fontWeight: '500',
    fontSize: 24,
    backgroundColor: 'transparent',
    zIndex: 9999,
    width: width * 0.8,
    marginHorizontal: 10,
  },
  subTitle: {
    color: '#000',
    marginRight: 16,
    marginBottom: 14,
    marginLeft: 15,
    marginTop: Platform.OS == 'ios' ? 10 : 7,
    fontSize: 14,
    backgroundColor: 'transparent',
    zIndex: 9999,
  },
  label: {
    color: '#000',
    width: 80,
    paddingLeft: 12,
    paddingTop: Platform.OS == 'android' ? 4 : 4,
    fontSize: 12,
    lineHeight: 18,
  },
  text: {
    color: '#000',
    fontSize: 12,
    paddingTop: Platform.OS == 'android' ? 4 : 5,
    width: width * 0.7,
    lineHeight: 18,
    alignSelf: 'flex-start',
  },
  section: {
    marginTop: 15,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderTopColor: '#ddd',
    borderTopWidth: 5,
    width: width,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 2,
    shadowOffset: {width: 0, height: 1},
    borderRadius: 3,
  },
  sectionMap: {
    paddingBottom: 0,
  },
  lineTitle: {
    flexDirection: 'row',
    width: '80%',
    alignItems: 'center',
    paddingVertical: 10,
    paddingBottom: 15,
    paddingLeft: 20,
  },
  lineTitleMap: {
    width: '60%',
  },
  lineMapRight: {
    width: '40%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ltitle: {
    fontSize: 20,
    color: 'rgb(69,69,83)',
  },
  boxItems: {
    marginHorizontal: 20,
  },
  boxRelatedItems: {
    marginLeft: 10,
  },
});
