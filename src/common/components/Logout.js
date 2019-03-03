import React, {PureComponent} from 'react'
import {TouchableOpacity, View} from 'react-native'
import {connect} from 'react-redux'
import {Icon} from "react-native-material-ui"

//Local
import {logout} from "../redux/actions/LoginActions";
import {retrieveSymbols} from "../redux/actions/SearchActions";

class Logout extends PureComponent {

  logoutIconPressed = () => {
    this.props.dispatch(logout())
    this.props.dispatch(retrieveSymbols([]))
  }

  render() {
    return (
      <TouchableOpacity onPress={() => this.logoutIconPressed()}>
        <Icon name={'exit-to-app'} color={'white'} size={30}/>
      </TouchableOpacity>
    )
  }
}

export default connect()(Logout)
