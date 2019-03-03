import React, {PureComponent} from 'react'
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import theme from "../theme";
import PropTypes from "prop-types";

class NewsListItem extends PureComponent {

  static propTypes = {
    description: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    onPress: PropTypes.func
  }
  static defaultProps = {
    onPress: ()=>{},
  }

  render() {
    const {description, date, onPress=()=>{}} = this.props
    return (
      <TouchableOpacity onPress={onPress}>
        <View style={styles.container}>
          <Text style={styles.newsDescriptionText}>{description}</Text>
          <Text style={styles.DateText}>{date}</Text>
          <View style={styles.divider}/>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignSelf:'center',
    width: '95%',
    marginTop:10,
    justifyContent:'center',
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.disabledColor,
    width: '95%',
    marginTop:5
  },
  newsDescriptionText:{
    fontSize: 16
  },
  DateText: {
    color: theme.colors.secondaryTextColor,
    marginRight: 20,
    fontSize:12,
    marginTop:3
  }
})

export {NewsListItem}
