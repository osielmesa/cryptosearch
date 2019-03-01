import React from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";

//Local
import SignIn from './screens/SignIn'

const LoggedOutNavigator = createStackNavigator({
  Signin: {
    screen: SignIn
  }
},{
  headerMode:'none'
});

export default createAppContainer(LoggedOutNavigator);
