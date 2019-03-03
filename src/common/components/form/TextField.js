import React, {PureComponent} from 'react'
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
    orientation: PropTypes.string,
    width: PropTypes.number
  }
  static defaultProps = {
    containerStyle: null,
    isPasswordType: false,
    errorInvalidText: 'Invalid Field!',
    errorEmptyText: 'Empty Field!',
    width: 270
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
      width = 270,
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
        containerStyle={containerStyle ? containerStyle : {width:width, height: 60}}
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

export {TextField}
