import React, { Component } from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking,
  View,
  Dimensions
} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';

export default class ScanScreen extends Component {

  static navigationOptions = {
    drawerLabel: '  Scan Screen',
  };

  onSuccess(e) {
    Linking.openURL(e.data).catch(err => console.error('An error occured', err));
  }

  render() {
    return (
        <View style={{flex:1}}>
          <QRCodeScanner
            onRead={() => alert('Success')}
            cameraStyle={styles.cameraContainer}
            topViewStyle={styles.zeroContainer}
            bottomViewStyle={styles.zeroContainer}
            showCustomMarker={true}
            fadeIn={false}
          /> 
        </View>
    );
  }
}

const styles = StyleSheet.create({
  zeroContainer: {
    height: 0,
    flex: 0,
  },
  cameraContainer: {
    height: Dimensions.get('window').height,
  },
});