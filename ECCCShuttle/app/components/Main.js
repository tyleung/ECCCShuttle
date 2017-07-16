import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  StatusBar,
  View,
  Text,
  TouchableOpacity,
  Image
} from 'react-native';


export default class ECCCShuttle extends Component {
  render() {
    return (
        <View style={styles.container}>
          <StatusBar
            backgroundColor='black'
            />
          <TouchableOpacity style={styles.buttonContainer}>
              <Text style={[styles.ralewayLight, styles.QRButtonText]}>
                Scan QR Code
              </Text>
              <View style={{marginLeft: 200}}>
                  <Image source={require('./../../assets/qricon.png')} style={styles.image} />
              </View>
          </TouchableOpacity>
          <Text style={[styles.ralewayLightItalic, styles.pointText]}>
                You have 1000 points!
          </Text>
          <Text style={[styles.ralewayLight, styles.updateText]}>
                last updated: just now
          </Text>
          <TouchableOpacity style={styles.refresh}>
                  <Image source={require('./../../assets/refresh.png')} style={styles.refreshImage}/>
                  <Text style={[styles.ralewayLight, styles.refreshButtonText]}>Refresh</Text>
          </TouchableOpacity>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#F5F5F5'
  },
  buttonContainer:{
    marginTop: 200,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderColor: '#223E4A',
    borderTopWidth: 1,
    borderBottomWidth: 1
  },
  QRButtonText: {
    fontSize: 22,
    color: 'black', 
    paddingLeft: 21, 
    paddingVertical: 17
  },
  ralewayLight: {
    fontFamily: 'Raleway-Light'
  },
  image: {
    resizeMode: 'contain',
    width: 30,
    height: 58
  },
  ralewayLightItalic: {
    fontFamily: 'Raleway-LightItalic'
  },
  pointText: {
    marginTop: 46,
    fontSize: 22,
    color: 'black',
    textAlign: 'center',
  },
  updateText: {
    marginTop: 8,
    fontSize: 15,
    color: 'black',
    textAlign: 'center',
  },
  refresh:{
    marginTop: 15,
    marginHorizontal: 105,
    borderRadius: 23,
    borderWidth: 1,
    paddingVertical: 7,
    flexDirection: 'row',
  },
  refreshButtonText: {
  marginLeft: 23,
  fontSize: 22,
  color: 'black'
  },
  refreshImage: {
  marginLeft: 10,
  resizeMode: 'contain',
  width: 30,
  height: 30
  }
});

AppRegistry.registerComponent('Main', () => Main);