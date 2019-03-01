import React, {Component} from 'react'
import { Modal, StyleSheet, View, Text } from 'react-native'
import { connect } from 'react-redux'
import { DotIndicator } from 'react-native-indicators';
//Local
import theme from '../theme'


class LoadingModal extends Component {

  onRequestClose = () => {};

  render() {
    const {loading, loadingText} = this.props
    return (
      <Modal
        onRequestClose={this.onRequestClose}
        transparent
        visible={loading}>
        <View style={styles.overlay}>
          <View style={{height:80}}>
            <DotIndicator color={theme.colors.primary} size={10} count={3} />
          </View>
          <Text style={styles.loadingText}>{loadingText}</Text>
        </View>
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  overlay: {
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.70)',
    flex: 1,
    justifyContent: 'center',
  },
  loadingText:{
    color:theme.colors.disabledColor
  }
})

const mapStateToProps = state => ({
  loading: state.ui.loading,
  loadingText: state.ui.loadingText
});

export default connect(mapStateToProps)(LoadingModal)
