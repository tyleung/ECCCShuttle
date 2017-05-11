import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  StatusBar,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

export default class Login extends Component {

  signUpOnPress(){
      console.log('Sign up pressed')
  }

  loginOnPress(){
      console.log('Login pressed')
  }

  render() {
    return (
        <View style={styles.container}>
            <StatusBar
            backgroundColor='black'
            />
            <View>
                <Image source={require('./../../assets/logo.png')} style={styles.image} />
                <View style={styles.line} />
                <Text style={styles.title}>
                <Text style={styles.titleFirstHalf}>
                    Park & Ride
                </Text>
                <Text style={styles.titleSecondHalf}>
                    &nbsp;Reward Program
                </Text>
                </Text>
                <TextInput style={styles.input}
                    placeholder='Email address'
                    keyboardType='email-address'
                    multiline={false}
                    autoCapitalize='none'
                    autoCorrect={false}
                    underlineColorAndroid={'transparent'}
                    returnKeyType='go'
                    onSubmitEditing={this.loginOnPress}
                />
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.c1} onPress={this.signUpOnPress}>
                        <View>
                            <Text style={styles.button}>Sign up</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.c2} onPress={this.loginOnPress}>
                        <View>
                            <Text style={styles.button}>Login</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
    },
    image: {
        top: -101,
        resizeMode: 'contain',
        width: 280,
    },
    line: {
        top: -96,
        width: 280,
        height: 1.5,
        backgroundColor: 'white'
    },
    title: {
        top: -92.5,
        color: 'white',
        fontSize: 21,
    },
    titleFirstHalf: {
        fontFamily: 'Raleway-LightItalic',
    },
    titleSecondHalf: {
        fontFamily: 'Raleway-Light',
    },
    input: {
        top: -25,
        width:280,
        height:39.5,
        backgroundColor: 'white',
        color: 'black',
        fontFamily: 'Raleway-Light',
        fontSize: 17,
        textAlign: 'center',
        textAlignVertical: 'center',
        borderRadius: 5
    },
    buttonContainer: {
        flexDirection: 'row',
        top: -15,
        width:280,
        height:39.5
    },
    c1 :{
        flex : 1,
        backgroundColor: 'white',
        borderRadius: 5,
        marginRight: 5

    },
    c2: {
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 5,
        marginLeft: 5
    },
    button: {
        height: '100%',
        backgroundColor: 'white',
        borderRadius: 5,
        color: 'black',
        fontFamily: 'Raleway-Light',
        fontSize: 17,
        textAlign: 'center',
        textAlignVertical: 'center'
    }
});

AppRegistry.registerComponent('Login', () => Login);
