import React, {Component} from 'react'
import { Modal, StyleSheet, View, Text } from 'react-native'
import { connect } from 'react-redux'
import { MaterialIndicator } from 'react-native-indicators';
import PropTypes from "prop-types";

//Local
import theme from '../theme'

class LoadingModal extends Component {

  static propTypes = {
    loading: PropTypes.bool,
    loadingText: PropTypes.string,
  }

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
            <MaterialIndicator color={theme.colors.messageColor} size={40}/>
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
