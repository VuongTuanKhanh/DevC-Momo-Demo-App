import React, { Component } from "react";
import { Text, View, StyleSheet, Button, AsyncStorage } from "react-native";
import Constants from "expo-constants";

export default class UserScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.paragraph}>User ...</Text>
        <Button title="Actually, sign me out :)" onPress={this._signOutAsync} />
      </View>
    );
  }

  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate("Auth");
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#ecf0f1"
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    textAlign: "center"
  }
});
UserScreen.navigationOptions = {
  title: "User Info"
};
