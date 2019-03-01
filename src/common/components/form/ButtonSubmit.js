import React, {Component} from 'react'
import { Button } from 'react-native-material-ui';
//Local
import theme from '../../theme'

class ButtonSubmit extends Component {
  render() {
    const {
      text,
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
        text={text}
        style={buttonCustomStyle}
        onPress={onPress}
        disabled={disabled || submitting}
        icon={icon}
      />
    )
  }
}

export {ButtonSubmit}
