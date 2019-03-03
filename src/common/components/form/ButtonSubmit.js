import React, {Component} from 'react'
import { Button } from 'react-native-material-ui';
import PropTypes from 'prop-types'
//Local
import theme from '../../theme'

class ButtonSubmit extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    submitting: PropTypes.bool,
    onPress: PropTypes.func,
    icon: PropTypes.element
  }
  static defaultProps = {
    disabled:false,
    submitting:false,
    onPress:()=>{},
    icon: null
  }
  render() {
    const {
      title,
      disabled=false,
      submitting=false,
      onPress=()=>{},
      icon = null
    } = this.props

    const buttonCustomStyle={
      container:{
        width:270,
        height: 60,
        backgroundColor:disabled || submitting ? theme.colors.disabledColor :theme.colors.primary,
      },
      text:{color:'white'}
    }

    return (
      <Button
        raised
        text={title}
        style={buttonCustomStyle}
        onPress={onPress}
        disabled={disabled || submitting}
        icon={icon}
      />
    )
  }
}

export {ButtonSubmit}
