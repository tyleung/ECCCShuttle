import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  StatusBar,
  View
} from 'react-native';


export default class ECCCShuttle extends Component {
  render() {
    return (
        <View style={styles.container}>
          <View style={styles.buttonContainer}>
            <Text style={styles.QRButtonText}>Scan QR Code</Text>
          </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255,255,255,0.04)'
  },
  buttonContainer:{

  },
  QRButtonText: {
    
  }
});

AppRegistry.registerComponent('Main', () => Main);