import React, {PureComponent} from 'react'
import {View, StyleSheet, Text,TouchableOpacity} from 'react-native'
import { Icon } from 'react-native-material-ui';

import theme from '../theme'
import PropTypes from "prop-types";

class SymbolListItem extends PureComponent {

  static propTypes = {
    title: PropTypes.string.isRequired,
    secondaryText: PropTypes.string.isRequired,
    iconName: PropTypes.string.isRequired,
    iconColor: PropTypes.string.isRequired,
    onPress: PropTypes.func,
    onIconPress: PropTypes.func
  }
  static defaultProps = {
    onPress: ()=>{},
    onIconPress: ()=>{}
  }

  render() {
    const {title, secondaryText, iconName, iconColor, onPress=()=>{}, onIconPress=()=>{}} = this.props
    return (
      <TouchableOpacity onPress={onPress}>
        <View style={styles.container}>
          <View style={styles.rowView}>
            <Text>{title}</Text>
            <View style={styles.secondaryView}>
              <Text style={styles.balanceText}>{secondaryText}</Text>
              <TouchableOpacity onPress={onIconPress}>
                <Icon name={iconName} color={iconColor}/>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.divider}/>
        </View>
      </TouchableOpacity>
    )
  }
}
const styles = StyleSheet.create({
  container:{
    alignSelf:'stretch',
    alignItems:'center',
  },
  rowView:{
    flexDirection:'row',
    width:'90%',
    justifyContent:'space-between',
    alignItems:'center',
    height:50,
  },
  secondaryView:{
    flexDirection: 'row',
    alignItems:'center'
  },
  divider:{
    height: 1,
    backgroundColor:theme.colors.disabledColor,
    width: '95%'
  },
  balanceText:{
    color:theme.colors.secondaryTextColor,
    marginRight:20,
  }
})

export {SymbolListItem}
