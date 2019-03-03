import React from 'react';
import { StyleSheet,View, StatusBar, Dimensions} from 'react-native';
import { Provider } from 'react-redux';

//Local
import store from './src/common/redux/Store'
import LoadingModal from './src/common/components/LoadingModal'
import Init from './src/init'
import {isPortrait} from "./src/common/utils";
import {changeOrientation} from "./src/common/redux/actions/UIActions";
import theme from './src/common/theme'

export default class App extends React.Component {

  componentDidMount(): void {
    this.dispatchOrientationChanged()
    // Event Listener for orientation changes
    Dimensions.addEventListener('change', () => {
      this.dispatchOrientationChanged()
    })
  }

  dispatchOrientationChanged = () => {
    const orientation = isPortrait() ? 'portrait' : 'landscape'
    store.dispatch(changeOrientation({orientation}))
  }

  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <LoadingModal/>
          <StatusBar backgroundColor={theme.colors.statusBarColor} barStyle="light-content"/>
          <Init/>
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});

