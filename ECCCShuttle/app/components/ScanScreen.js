import React, { Component } from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking,
  View
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
            title='Scan Code'
            onRead={() => alert('Success')}
            topContent={(
              <Text style={styles.centerText}>
                Go to <Text style={styles.textBold}>wikipedia.org/wiki/QR_code</Text> on your computer and scan the QR code.
              </Text>
            )}
            bottomContent={(
              <TouchableOpacity style={styles.buttonTouchable}>
                <Text style={styles.buttonText}>OK. Got it!</Text>
              </TouchableOpacity>
            )}
          /> 
        </View>
    );
  }
}

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },

  textBold: {
    fontWeight: '500',
    color: '#000',
  },

  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },

  buttonTouchable: {
    padding: 16,
  },
});


// import React, { Component } from 'react';
// import {
//   AppRegistry,
//   StyleSheet,
//   StatusBar,
//   View,
//   Text,
//   ToolbarAndroid,
// } from 'react-native';

// import QRCodeScanner from 'react-native-qrcode-scanner';


// export default class Test extends Component {
//   static navigationOptions = {
//     drawerLabel: '  ScanScreen',
//   };

//   render() {
//     return (
//         <View style={styles.container}>
//           <StatusBar
//             backgroundColor='black'
//             />
//         </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex:1,
//     backgroundColor: '#F5F5F5'
//   },
//   ralewayLight: {
//     fontFamily: 'Raleway-Light'
//   },
//   ralewayLightItalic: {
//     fontFamily: 'Raleway-LightItalic'
//   },
//   toolbar: {
//    backgroundColor: 'black',
//    height: 56,
//    alignSelf: 'stretch',
//   }  
// });