import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  StatusBar,
  Image,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  View
} from 'react-native';

import Modal from 'react-native-modal'

export default class Login extends Component {

  state = {
    isModalVisible: false
  }

  _showModal = () => this.setState({ isModalVisible: true })
  _hideModal = () => this.setState({ isModalVisible: false })

  signUpOnPress(){
      console.log('Sign up pressed')
  }

  loginOnPress(){
      console.log('Login pressed')
  }

  createOnPress(){
      console.log('Create pressed')
  }

  render() {
    return (
        <View style={styles.container}>
            <StatusBar
            backgroundColor='black'
            />
            <View>
                <Image source={require('./../../assets/logo.png')} style={styles.image} />
                <View style={styles.logoLine}/>
                <Text style={styles.title}>
                    <Text style={styles.ralewayLightItalic}>
                        Park & Ride
                    </Text>
                    <Text style={styles.ralewayLight}>
                        &nbsp;Reward Program
                    </Text>
                </Text>
                <TextInput style={styles.emailInput}
                    placeholder='Email address'
                    keyboardType='email-address'
                    multiline={false}
                    autoCapitalize='none'
                    autoCorrect={false}
                    underlineColorAndroid={'transparent'}
                    returnKeyType='next'
                    onSubmitEditing={() => this.passwordInput.focus()}
                />
                <TextInput style={styles.PWInput}
                    placeholder='Password'
                    keyboardType='default'
                    secureTextEntry
                    multiline={false}
                    autoCapitalize='none'
                    autoCorrect={false}
                    underlineColorAndroid={'transparent'}
                    returnKeyType='go'
                    onSubmitEditing={this.loginOnPress}
                    ref={(input) => this.passwordInput = input}
                />
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.c1} onPress={this._showModal}>
                        <View>
                            <Text style={styles.button}>Sign up</Text>
                        </View>
                    </TouchableOpacity>
                    <Modal isVisible={this.state.isModalVisible}>
                        <TouchableOpacity style={{flex: 1}} activeOpacity={1} onPress={this._hideModal}>
                            <TouchableWithoutFeedback>
                                <View style={styles.signUpContainer}>
                                    <Text style={[styles.ralewayLight, {fontSize:25, padding:28}]}>Sign up</Text>
                                    <Text style={[styles.ralewayLight, {fontSize:18, paddingLeft:28}]}>Email:</Text>
                                    <TextInput style={styles.signUpInput}
                                        keyboardType='email-address'
                                        multiline={false}
                                        autoCapitalize='none'
                                        autoCorrect={false}
                                        returnKeyType='next'
                                        underlineColorAndroid={'black'}
                                        onSubmitEditing={() => this.signUpPasswordInput.focus()}
                                    />
                                    <Text style={[styles.ralewayLight, {fontSize:18, paddingLeft:28}]}>Password:</Text>
                                    <TextInput style={styles.signUpInput}
                                        keyboardType='default'
                                        secureTextEntry
                                        multiline={false}
                                        autoCapitalize='none'
                                        autoCorrect={false}
                                        returnKeyType='next'
                                        underlineColorAndroid={'black'}
                                        onSubmitEditing={() => this.signUpFirstNameInput.focus()}
                                        ref={(input) => this.signUpPasswordInput = input}
                                    />
                                    <Text style={[styles.ralewayLight, {fontSize:18, paddingLeft:28}]}>First name:</Text>
                                    <TextInput style={styles.signUpInput}
                                        keyboardType='default'
                                        multiline={false}
                                        autoCapitalize='words'
                                        autoCorrect={false}
                                        returnKeyType='next'
                                        underlineColorAndroid={'black'}
                                        onSubmitEditing={() => this.signUpLastNameInput.focus()}
                                        ref={(input) => this.signUpFirstNameInput = input}
                                    />
                                    <Text style={[styles.ralewayLight, {fontSize:18, paddingLeft:28}]}>Last name:</Text>
                                    <TextInput style={styles.signUpInput}
                                        keyboardType='default'
                                        multiline={false}
                                        autoCapitalize='words'
                                        autoCorrect={false}
                                        returnKeyType='next'
                                        underlineColorAndroid={'black'}
                                        onSubmitEditing={() => this.signUpLicensePlateInput.focus()}
                                        ref={(input) => this.signUpLastNameInput = input}
                                    />
                                    <Text style={[styles.ralewayLight, {fontSize:18, paddingLeft:28}]}>License plate:</Text>
                                    <TextInput style={styles.signUpInput}
                                        keyboardType='default'
                                        multiline={false}
                                        autoCapitalize='characters'
                                        autoCorrect={false}
                                        returnKeyType='go'
                                        underlineColorAndroid={'black'}
                                        onSubmitEditing={this.createOnPress}
                                        ref={(input) => this.signUpLicensePlateInput = input}
                                    />
                                    <View style={styles.signUpPageButtonContainer}>
                                        <TouchableOpacity onPress={this._hideModal}>
                                                <Text style={styles.buttonForSignUpPage}>CANCEL</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.c3} onPress={this.createOnPress}>
                                                <Text style={styles.buttonForSignUpPage}>CREATE</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </TouchableWithoutFeedback>
                        </TouchableOpacity>
                    </Modal>
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
        backgroundColor: 'black'
    },
    image: {
        top: -81,
        resizeMode: 'contain',
        width: 280
    },
    logoLine: {
        top: -76,
        width: 280,
        height: 1.5,
        backgroundColor: 'white'
    },
    title: {
        top: -72.5,
        color: 'white',
        fontSize: 21
    },
    ralewayLightItalic: {
        fontFamily: 'Raleway-LightItalic'
    },
    ralewayLight: {
        fontFamily: 'Raleway-Light'
    },
    emailInput: {
        top: 5,
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
    PWInput: {
        top: 15,
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
        top: 25,
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
    },
    signUpContainer: {
        flex: 1,
        marginVertical: 75,
        marginHorizontal: 24,
        backgroundColor: 'white',
        borderRadius: 10
    },
    signUpInput: {
        color: 'black',
        fontFamily: 'Raleway-Light',
        marginHorizontal: 28,
        marginTop: -7,
        textAlign: 'center',
        fontSize: 17
    },
    signUpPageButtonContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginBottom: -7
    },
    buttonForSignUpPage: {
        height: '100%',
        color: 'black',
        fontFamily: 'Raleway-Light',
        fontSize: 17,
        textAlign: 'center',
        textAlignVertical: 'center'
    },
    c3: {
        paddingHorizontal:28
    }
});

AppRegistry.registerComponent('Login', () => Login);
