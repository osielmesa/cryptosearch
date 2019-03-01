import React, {Component} from 'react'
import {StyleSheet, View} from 'react-native'

//Local
import LoggedIn from '../loggedIn'
import LoggedOut from '../loggedOut'


class Init extends Component {
  //In order to set initial state without props dependency there is no need to use constructor.
  state={
    user:null
  }

  componentDidMount() {
    //make request for login
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.user ? <LoggedOut/> : <LoggedIn/>}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1
  }
})

export default Init
