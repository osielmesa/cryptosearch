import React from 'react';
import { StyleSheet,View, YellowBox, StatusBar} from 'react-native';
import { Provider } from 'react-redux';

YellowBox.ignoreWarnings([
  'Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?',
  'Remote debugger'
])

//Local
import store from './src/common/redux/Store'
import LoadingModal from './src/common/components/LoadingModal'
import Init from './src/init'


export default class App extends React.Component {

  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <StatusBar backgroundColor="#31766C" barStyle="light-content" />
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

