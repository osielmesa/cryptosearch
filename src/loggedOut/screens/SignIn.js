import React, {Component} from 'react'
import {View, Text, StyleSheet} from 'react-native'
import {connect} from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import {MaterialIndicator} from 'react-native-indicators';
//Local
import theme from '../../common/theme'
import {isEmailValid, isPasswordValid} from "../../common/utils";
import {TextField,ButtonSubmit} from "../../common/components";
import {login} from "../../common/redux/actions/LoginActions";

class SignIn extends Component {
  state={
    errorFromApi:''
  }

  login = (values) => {
    this.props.dispatch(login({username:values.email.toLowerCase(),password:values.password}))
  }

  render() {
    const {invalid, error,submitting,handleSubmit, loadingLogin, showLoginError, errorMessage} = this.props
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
          {showLoginError &&
            <Text style={styles.errorFromApiText}>{errorMessage}</Text>
          }
          <ButtonSubmit
            text={loadingLogin ? '' : 'SIGN IN'}
            disabled={invalid && !error}
            submitting={submitting}
            onPress={handleSubmit(this.login)}
            icon={loadingLogin ? <MaterialIndicator color={theme.colors.disabledColor} size={20} /> : null}
          />
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
    top:80,
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

const mapStateToProps = state => ({
  loadingLogin: state.login.loadingLogin,
  showLoginError: state.login.showLoginError,
  errorMessage: state.login.errorMessage
});

export default connect(mapStateToProps)(reduxForm({form:'SignIn'})(SignIn))
