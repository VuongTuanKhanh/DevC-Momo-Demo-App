import React, {Component} from 'react';
import {
  View,
  Button,
  AsyncStorage,
  Text,
  ActivityIndicator,
  TouchableWithoutFeedback,
  TouchableOpacity,
  StyleSheet,
  ToastAndroid,
} from 'react-native';
import * as IntentLauncher from 'expo-intent-launcher';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import {connect} from 'react-redux';
import {Entypo} from '@expo/vector-icons';
import {Input, SocialIcon} from 'react-native-elements';
import {
  getCurrentLocation,
  userDenyGetCurrentLocation,
  waitForGetLocation,
  changeMapRange,
  initUserId,
  getUserId,
  facebookLogin,
} from '../redux/UserRedux';
import {getCategories} from '../redux/CategoryRedux';

class SignInScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    id: '',
    email: '',
    test: false, // normal: false, testing: true
  };
  componentDidMount () {
    this.props.getCategories ();
  }

  _getLocationAsync = async () => {
    let {status} = await Permissions.askAsync (Permissions.LOCATION);
    if (status !== 'granted') {
      //redux save
      console.log ('Permission to access location was denied');
    }
    try {
      const location = await Location.getCurrentPositionAsync ({});
      this.props.getUserLocation ({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0022727,
        longitudeDelta: 0.0022727,
      });
      this.props.initMapRange (0.0022727); //250m
    } catch (err) {
      console.log (err);
      this.props.getUserLocationFail ();
    }
  };

  onChangeInput = e => {
    this.setState ({email: e});
  };
  onChangeIdInputTest = e => {
    this.setState ({id: e});
  };

  onClick = async () => {
    try {
      const locationAccepted = await IntentLauncher.startActivityAsync (
        IntentLauncher.ACTION_LOCATION_SOURCE_SETTINGS
      );
      if (locationAccepted) {
        this.props.isLoading ();
        await this._getLocationAsync ();
      }
    } catch (err) {}
  };

  render () {
    const {user} = this.props;
    if (user.isLoading) {
      return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color="blue" />
        </View>
      );
    }
    if (!user.hasLocation) {
      return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text>Hãy cung cấp vị trí của bạn để truy cập ứng dụng.</Text>
          <Button title="GOT IT!" onPress={this.onClick} />
        </View>
      );
    }
    return (
      <TouchableWithoutFeedback
        style={{flex: 1}}
        delayLongPress={5000}
        onLongPress={this.changeAppStatus}
      >
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          {!this.state.test
            ? <React.Fragment>
                <Input
                  value={this.state.email}
                  onChangeText={this.onChangeInput}
                  placeholder="Nhập email của bạn nào."
                  leftIconContainerStyle={{marginRight: 10}}
                  leftIcon={<Entypo name="mail" size={24} color="black" />}
                />
                <TouchableOpacity
                  onPress={this.checkUserExist}
                  style={styles.button}
                >
                  <Text style={styles.buttonText}>Đăng nhập</Text>
                </TouchableOpacity>
                <SocialIcon
                  style={styles.button}
                  title="Đăng nhập với facebook"
                  button
                  type="facebook"
                  onPress={this.fbLogIn}
                />
              </React.Fragment>
            : <React.Fragment>
                <Input
                  value={this.state.id}
                  onChangeText={this.onChangeIdInputTest}
                  placeholder="Nhập userId để test"
                  leftIcon={<Entypo name="mail" size={24} color="black" />}
                  leftIconContainerStyle={{marginRight: 10}}
                />
                <TouchableOpacity
                  onPress={this.testMethod}
                  style={styles.button}
                >
                  <Text style={styles.buttonText}>Test thôi!</Text>
                </TouchableOpacity>
              </React.Fragment>}
        </View>
      </TouchableWithoutFeedback>
    );
  }

  checkUserExist = () => {
    getUserId (this.state.email)
      .then (res => {
        this.props.initUserId (res.data.id);
        this._signInAsync (res.data.id);
      })
      .catch (err => {
        //handle new user after
        this.props.initUserId ('0');
        this._signInAsync ('0');
      });
  };

  _signInAsync = async token => {
    // gán userID sau
    await AsyncStorage.setItem ('userToken', JSON.stringify (token));
    this.props.navigation.navigate ('Main');
  };

  testMethod = () => {
    this.props.initUserId (this.state.id);
    this._signInAsync (this.state.id);
  };

  changeAppStatus = () => {
    this.setState ({test: !this.state.test});
  };

  fbLogIn = async () => {
    const userEmail = await facebookLogin ();
    ToastAndroid.show ('Đợi tí nha. Tui đang xử lý', ToastAndroid.BOTTOM);
    console.log (userEmail);
    getUserId (userEmail)
      .then (res => {
        this.props.initUserId (res.data.id);
        this._signInAsync (res.data.id);
      })
      .catch (err => {
        console.log ('người ngoài');
        //handle new user after
        this.props.initUserId ('0');
        this._signInAsync ('0');
      });
  };
}

const mapStateToProps = state => {
  return {
    user: state.user,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getUserLocation: region => dispatch (getCurrentLocation (region)),
    getUserLocationFail: () => dispatch (userDenyGetCurrentLocation ()),
    isLoading: () => dispatch (waitForGetLocation ()),
    getCategories: () => dispatch (getCategories ()),
    initMapRange: range => dispatch (changeMapRange (range)),
    initUserId: userId => dispatch (initUserId (userId)),
  };
};

export default connect (mapStateToProps, mapDispatchToProps) (SignInScreen);

const styles = StyleSheet.create ({
  button: {
    borderColor: '#ddd',
    borderWidth: 1,
    padding: 10,
    marginTop: 10,
    borderRadius: 20,
    width: 270,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '400',
  },
});
