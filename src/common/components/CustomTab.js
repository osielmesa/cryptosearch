import React, {PureComponent} from 'react'
import {View, TouchableWithoutFeedback, Text, StyleSheet} from 'react-native'
import * as Animatable from 'react-native-animatable';
import theme from '../theme'
import {Icon} from 'react-native-material-ui'

class CustomTab extends PureComponent {

  constructor(){
    super()
    this.state = {
      routeNameSelected:'Home'
    }
  }

  getIconName(routeName){
    switch (routeName) {
      case 'Search':
        return 'list'
      case 'Favorites':
        return 'favorite'
    }
  }

  getTitle(routeName){
    switch (routeName) {
      case 'Search':
        return 'Market Search'
      case 'Favorites':
        return 'Favorites'
    }
  }

  onPressTab(routeName){
    this.props.jumpTo(routeName)
    this.setState({
      routeNameSelected:routeName
    })
  }

  render() {
    const {navigation} = this.props;
    const {routes} = navigation.state;
    return (
      <View style={styles.tabbar}>
        {routes && routes.map((route, index) => {
          return (
            <TouchableWithoutFeedback
              key={route.key}
              style={styles.tab}
              onPress={() => this.onPressTab(route.routeName)}
            >
              <View style={{minHeight:50, justifyContent:'center'}}>
                {navigation.state.index===index &&
                <Animatable.View animation="rubberBand" duration={1000} style={styles.tab}>
                  <Icon size={24} name={this.getIconName(route.routeName)} style={{ color: theme.colors.primary }} />
                  <Text style={[styles.tabText,{color: theme.colors.primary}]}>{this.getTitle(route.routeName)}</Text>
                </Animatable.View>
                }
                {navigation.state.index!==index &&
                <View style={styles.tab}>
                  <Icon size={24} name={this.getIconName(route.routeName)} style={{ color: theme.colors.secondaryTextColor }} />
                </View>
                }
              </View>
            </TouchableWithoutFeedback>
          );
        })}

      </View>
    )
  }
}

const styles = StyleSheet.create({
  tabbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.7,
    shadowRadius: 5,
    elevation: 1,
  },
  activeTintColor: {
    backgroundColor: 'rgb(255,255,255)',
  },
  tab: {
    minWidth:70,
    backgroundColor: 'white',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabText: {
    fontSize: 11,
    marginTop:-5,
    fontWeight:'bold'
  },
  inactiveTintColor: {
    backgroundColor: 'rgb(255,255,255)',
  }
});

export {CustomTab}
