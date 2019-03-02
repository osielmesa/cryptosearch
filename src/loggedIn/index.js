import React from "react";
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from "react-navigation";
import Logout from '../common/components/Logout'

//Local
import Search from './screens/Search'
import Favorites from './screens/Favorites'
import SymbolDetails from './screens/SymbolDetails'
import {CustomTab} from "../common/components";
import {headerStyle, headerTitleStyle} from "../common/utils";
import theme from "../common/theme";

const TabNavigator = createBottomTabNavigator({
  Search: {
    screen: Search
  },
  Favorites: {screen: Favorites}
},{
  tabBarComponent:CustomTab,
});

const LoggedInNavigator = createStackNavigator({
  Tabs: {screen: TabNavigator},
  SymbolDetails: {screen:SymbolDetails}
});

const getTitle = (routeName) =>{
  switch (routeName) {
    case 'Search':
      return 'Market Search'
    case 'Favorites':
      return 'Favorites'
  }
}

TabNavigator.navigationOptions = ({ navigation }) => {
  const { routeName } = navigation.state.routes[navigation.state.index];
  const headerTitle = getTitle(routeName);
  return {
    headerTitle,
    headerStyle: headerStyle,
    headerTintColor: theme.colors.headerTintColor,
    headerTitleStyle: headerTitleStyle,
    headerRight: (<Logout/>),
  };
};

export default createAppContainer(LoggedInNavigator);
