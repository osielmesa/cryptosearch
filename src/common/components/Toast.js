import Toast from 'react-native-root-toast';
//Local
import theme from '../theme'

const showToast = (message, position = Toast.positions.TOP) => {
  Toast.show(message, {
    duration: Toast.durations.LONG,
    position: position,
    textColor:'white',
    backgroundColor:theme.colors.messageBackgroundColor,
    opacity:1,
    animation: true,
    hideOnPress: true,
    shadow: true,
    delay: 0
  });
}

const showErrorToast = (message, position = Toast.positions.TOP) => {
  Toast.show(message, {
    duration: Toast.durations.LONG,
    position: position,
    textColor:'white',
    backgroundColor:theme.colors.errorBackgroundColor,
    opacity:1,
    animation: true,
    hideOnPress: true,
    shadow: true,
    delay: 0
  });
}



export {showToast, showErrorToast}
