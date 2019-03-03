import {Dimensions} from 'react-native'

const isPortrait = () => {
  return Dimensions.get('window').width < Dimensions.get('window').height
};

export {isPortrait}
