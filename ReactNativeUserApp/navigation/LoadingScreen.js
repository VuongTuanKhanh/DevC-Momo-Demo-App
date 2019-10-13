import React from "react";
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  Platform,
  View
} from "react-native";
import Constants from "expo-constants";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import { connect } from "react-redux";
import {
  getCurrentLocation,
  userDenyGetCurrentLocation,
  changeMapRange
} from "../redux/UserRedux";

class LoadingScreen extends React.Component {
  async componentWillMount() {
    if (Platform.OS === "android" && !Constants.isDevice) {
      this.setState({
        errorMessage:
          "Oops, this will not work on Sketch in an Android emulator. Try it on your device!"
      });
    } else {
      await this._getLocationAsync();
    }
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      //redux save
      console.log("Permission to access location was denied");
    }
    try {
      const location = await Location.getCurrentPositionAsync({});
      this.props.getUserLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0022727,
        longitudeDelta: 0.0022727
      });
    } catch (err) {
      console.log(err);
      this.props.getUserLocationFail();
      this.props.initMapRange(0.0022727); //250m
    }
  };

  async componentDidMount() {
    await this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem("userToken");
    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(
      userToken && this.props.user.hasLocation ? "Main" : "Auth"
    );
  };

  // Render any loading content that you like here
  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="blue" />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getUserLocation: region => dispatch(getCurrentLocation(region)),
    getUserLocationFail: () => dispatch(userDenyGetCurrentLocation()),
    initMapRange: range => dispatch(changeMapRange(range))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoadingScreen);
