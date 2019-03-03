import React, {PureComponent} from 'react'
import {StyleSheet} from 'react-native'
import { TextField as MTextField} from 'react-native-material-textfield';
//Local
import theme from '../../theme'
import {isEmptyValue} from "../../utils";
import PropTypes from "prop-types";

class TextField extends PureComponent {

  static propTypes = {
    label: PropTypes.string.isRequired,
    containerStyle: PropTypes.object,
    isPasswordType: PropTypes.bool,
    errorInvalidText: PropTypes.string,
    errorEmptyText: PropTypes.string,
  }
  static defaultProps = {
    containerStyle: null,
    isPasswordType: false,
    errorInvalidText: 'Invalid Field!',
    errorEmptyText: 'Empty Field!',
  }

  state={
    empty:true
  }

  isEmpty = (text) => {
    this.setState({
      empty:isEmptyValue(text)
    })
  }

  render() {
    const {
      label,
      containerStyle,
      isPasswordType = false,
      errorInvalidText = 'Invalid Field!',
      errorEmptyText = 'Empty Field!',
      input:{
        onBlur,
        onChange
      },
      meta: {
        error,
        touched,
      },
      ...props
    } = this.props
    return (
      <MTextField
        label={label}
        containerStyle={containerStyle ? containerStyle : styles.containerStyle}
        secureTextEntry={isPasswordType}
        tintColor={theme.colors.primaryColor}
        onBlur={val=> onBlur(val)}
        onChangeText={ val => {onChange(val);this.isEmpty(val)}}
        error={!!error && touched ? (this.state.empty ? errorEmptyText : errorInvalidText) : ''}
        errorColor={theme.colors.errorColor}
        {...props}
      />
    )
  }
}

const styles = StyleSheet.create({
  containerStyle:{
    width:270,
    height: 60
  }
})

export {TextField}
