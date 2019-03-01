import React, {Component} from 'react'
import {View, Text, StyleSheet} from 'react-native'
import {connect} from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import {MaterialIndicator} from 'react-native-indicators';
//Local
import theme from '../../common/theme'
import {isEmailValid, isPasswordValid} from "../../common/utils";
import {TextField,ButtonSubmit} from "../../common/components";
import {login} from "../../common/redux/actions/Actions";

class SignIn extends Component {

  state={
    loading:false,
    errorFromApi:''
  }

  login = (values) => {
    console.log(values)
    this.props.dispatch(login({username:values.email.toLowerCase(),password:values.password}))
  }

  render() {
    const {invalid, error,submitting, handleSubmit,} = this.props
    return (
      <View style={styles.container}>
        <View style={styles.contentView}>
          <Text style={styles.titleText}>Welcome</Text>
        </View>
        <View style={styles.contentView}>
          <Field
            component={TextField}
            label={'Email'}
            name={'email'}
            validate={isEmailValid}
            errorInvalidText={'Email is invalid'}
            errorEmptyText={'Email is required'}
            keyboardType={'email-address'}
          />
          <View style={{marginTop: 30}}>
            <Field
              component={TextField}
              label={'Password'}
              name={'password'}
              validate={isPasswordValid}
              isPasswordType={true}
              errorEmptyText={'Password is required'}
            />
          </View>

        </View>

        <View style={styles.contentView}>
          {this.state.errorFromApi !== '' && <Text style={styles.errorFromApiText}>{this.state.errorFromApi}</Text>}
          <ButtonSubmit
            text={'SIGN IN'}
            disabled={invalid && !error}
            submitting={submitting}
            onPress={handleSubmit(this.login)}
          />
          {this.state.loading && <View style={styles.loadingView}>
            <View style={styles.indicatorView}><MaterialIndicator color={theme.colors.primary} size={20} /></View>
          </View>}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent: 'space-around'
  },
  contentView:{
    alignItems: 'center',
    alignSelf: 'stretch'
  },
  titleText:{
    color:theme.colors.titleColor,
    fontSize:25,
    fontWeight: 'bold'
  },
  loadingView:{
    position:'absolute',
    top:0,
    bottom:0,
    left:0,
    right:0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  indicatorView:{
    marginRight:85
  },
  errorFromApiText:{
    color:theme.colors.errorColor,
    marginBottom:15
  }
})

export default connect()(reduxForm({form:'SignIn'})(SignIn))
