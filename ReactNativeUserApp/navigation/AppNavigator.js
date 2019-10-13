import React from "react";
import {
  createAppContainer,
  createSwitchNavigator,
  createStackNavigator
} from "react-navigation";

import MainTabNavigator from "./MainTabNavigator";
import LoadingScreen from "./LoadingScreen";
import SignInScreen from "./SignInScreen";

const AuthStack = createStackNavigator({ SignIn: SignInScreen });
export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: LoadingScreen,
      Main: MainTabNavigator,
      Auth: AuthStack
    },
    {
      initialRouteName: "AuthLoading"
    }
  )
);
