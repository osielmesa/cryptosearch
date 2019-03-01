import React, {Component} from 'react'
import {StyleSheet, View} from 'react-native'
import {connect} from 'react-redux'

//Local
import LoggedIn from '../loggedIn'
import LoggedOut from '../loggedOut'
import {getSecurityData} from "../common/redux/actions/LoginActions";


class Init extends Component {
  //In order to set initial state without props dependency there is no need to use constructor.
  state={
    user:null
  }

  componentDidMount() {
    this.props.dispatch(getSecurityData())
  }

  render() {
    return (
      <View style={styles.container}>
        {this.props.user ? <LoggedIn/> : <LoggedOut/>}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1
  }
})

const mapStateToProps = state => ({
  user: state.login.user,
});

export default connect(mapStateToProps)(Init)
