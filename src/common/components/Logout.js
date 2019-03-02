import React, {PureComponent} from 'react'
import {TouchableOpacity, View} from 'react-native'
import {connect} from 'react-redux'
import {Icon} from "react-native-material-ui"

import {logout} from "../redux/actions/LoginActions";

class Logout extends PureComponent {
  render() {
    return (
      <TouchableOpacity onPress={() => this.props.dispatch(logout())}>
        <Icon name={'exit-to-app'} color={'white'} size={30}/>
      </TouchableOpacity>
    )
  }
}

export default connect()(Logout)
