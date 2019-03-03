import React from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";

//Local
import SignIn from './screens/SignIn'
import Welcome from './screens/Welcome'

const LoggedOutNavigator = createStackNavigator({
  Signin: {screen: SignIn},
  Welcome: {screen:Welcome}
},{
  headerMode:'none'
});

export default createAppContainer(LoggedOutNavigator);
