import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  StatusBar,
  View,
  Text,
  TouchableOpacity,
  ToolbarAndroid,
  Image
} from 'react-native';


export default class Main extends Component {
  // Name the drawerLabel for this page
  static navigationOptions = {
    drawerLabel: '  QR Scanner',
  };

  render() {
    var {navigate} = this.props.navigation;
    return (
        <View style={styles.container}>
          <ToolbarAndroid
            style={styles.toolbar}
            title=" QR Scanner"
            titleColor='white'
            navIcon={require('./../../Assets/navicon.png')}
            onIconClicked={() => this.props.navigation.navigate('DrawerOpen')}
            />
          <StatusBar
            backgroundColor='black'
            />

          {/* A button that navigates to QRScanner */}
          <TouchableOpacity style={styles.buttonContainer}  onPress={() => navigate("ScannerScreen")}>
              <View style={{flex: 1}}>
              <Text style={[styles.ralewayLight, styles.QRButtonText]}>
                Scan QR Code
              </Text>
              </View>
              <View style={{flex: 1, alignItems: 'flex-end', marginRight: 15, justifyContent: 'center'}}>
                  <Image source={require('./../../Assets/qricon.png')} style={styles.image} />
              </View>
          </TouchableOpacity>

          {/* Point */}
          <Text style={[styles.ralewayLightItalic, styles.pointText]}>
                You have 1000 points!
          </Text>

          {/* Update timer */}
          <Text style={[styles.ralewayLight, styles.updateText]}>
                last updated: just now
          </Text>

          {/* Refresh button */}
          <TouchableOpacity style={styles.refresh}>
                  <View style={{flex: 0.5, justifyContent: 'center', alignItems: 'center'}}>
                    <Image source={require('./../../Assets/refresh.png')} style={styles.refreshImage}/>
                  </View>
                  <View style={{flex: 1}}>
                    <Text style={[styles.ralewayLight, styles.refreshButtonText]}>Refresh</Text>
                  </View>
                  <View style={{flex: 0.5}}></View>
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
    height: 30
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
    flexDirection: 'row',
    marginTop: 15,
    marginHorizontal: 105,
    borderRadius: 23,
    borderWidth: 1,
    paddingVertical: 7,
    flexDirection: 'row'
  },
  refreshButtonText: {
    textAlign: 'center',
    fontSize: 22,
    color: 'black'
  },
  refreshImage: {
    resizeMode: 'contain',
    width: 30,
    height: 30
  },
  toolbar: {
    backgroundColor: 'black',
    height: 56,
    alignSelf: 'stretch',
  }  
});
