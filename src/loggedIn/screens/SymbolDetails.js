import React, {Component} from 'react'
import {View, Text} from 'react-native'
import {headerStyle, headerTitleStyle} from "../../common/utils";
import theme from "../../common/theme";

class SymbolDetails extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle:navigation.getParam('title', 'Details'),
      headerStyle: headerStyle,
      headerTintColor: theme.colors.headerTintColor,
      headerTitleStyle: headerTitleStyle,
    }
  }

  render() {
    return (
      <View>
        <Text>Details</Text>
      </View>
    )
  }
}

export default SymbolDetails
