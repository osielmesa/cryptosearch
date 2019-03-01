import React from 'react';
import { StyleSheet,View } from 'react-native';
import { Provider } from 'react-redux';

//Local
import store from './src/common/redux/Store'
import LoadingModal from './src/common/components/LoadingModal'
import Init from './src/init'


export default class App extends React.Component {

  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <LoadingModal/>
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

