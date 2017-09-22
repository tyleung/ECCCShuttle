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

// https://github.com/moaazsidat/react-native-qrcode-scanner
//import QRCodeScanner from 'react-native-qrcode-scanner';

export default class QRScanner extends Component {

  static navigationOptions = {
  };

  onSuccess(e) {
    Linking.openURL(e.data).catch(err => console.error('An error occured', err));
  }

  render() {
    var {navigate} = this.props.navigation;
    return (

        // QRScanner's style
        <View style={{flex:1}}>
          {/*
          <QRCodeScanner
            onRead={() => alert('Success')}
            cameraStyle={styles.cameraContainer}
            topViewStyle={styles.zeroContainer}
            bottomViewStyle={styles.zeroContainer}
            showCustomMarker={true}
            fadeIn={false}
            cameraOverlay={(
              <View style={styles.customRectangleContainer}>
                <View style={styles.customOutsideMarker}>
                  <Text style={styles.customTitleText}>Scan QR Code</Text>
                </View>
                <View style={{height: 250, flexDirection:'row'}}>
                  <View style={styles.customOutsideMarker}>
                  </View>
                  <View style={styles.customRectangle}/> 
                  <View style={styles.customOutsideMarker}>
                  </View>
                </View>

                <View style={[styles.customOutsideMarker, {justifyContent:'flex-end', alignItems: 'center'}]}>
                  <TouchableOpacity style={{marginBottom: 50}} onPress={() => navigate("MainScreen")}>
                      <Text style={styles.customBottomText}>Cancel</Text>
                  </TouchableOpacity> 
                </View>
              </View>
            )}
          />
        */}
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
    customRectangleContainer: {
    flex: 0,
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    flexDirection: 'column',
  },

  customRectangle: {
    height: 250,
    width: 250,
    borderWidth: 1,
    borderColor: 'white',
    backgroundColor: 'transparent',
  },
  customOutsideMarker: {
    flex:1,
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  customTitleText: {
    color: 'white',
    fontSize: 22,
    textAlign: 'center',
    marginTop: 20
  },
  customBottomText: {
    color: 'white',
    fontSize: 22,
  },
});