import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  StatusBar,
  View,
  Text,
  ToolbarAndroid,
  TextInput,
} from 'react-native';


export default class EditName extends Component {
  // Name the drawerLabel for this page
  static navigationOptions = {
  };

  render() {
    var {goBack} = this.props.navigation;
    return (
        <View style={styles.container}>
          <ToolbarAndroid
            style={styles.toolbar}
            title=" Edit Name"
            titleColor='white'
            navIcon={require('./../../Assets/backIcon.png')}
            onIconClicked={() => goBack()}
            />
          <StatusBar
            backgroundColor='black'
            />

          {/* Text input for name */}
          <View style={styles.editContainer}>
            <TextInput style={styles.editText}
              placeholder='Name'
              keyboardType='default'
              multiline={false}
              autoCapitalize='words'
              autoCorrect={false}
              returnKeyType='go'
              underlineColorAndroid={'transparent'}
            />
          </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#F5F5F5',
  },
  ralewayLight: {
    fontFamily: 'Raleway-Light'
  },
  toolbar: {
   backgroundColor: 'black',
   height: 56,
   alignSelf: 'stretch',
  },
  editContainer: {
    backgroundColor: 'white',
    borderColor: '#223E4A',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    marginTop: 180
  },
  editText: {
    fontFamily: 'Raleway-Light',
    fontSize: 22,
    color: 'black', 
    paddingHorizontal: 21, 
    paddingVertical: 17
  },
});
