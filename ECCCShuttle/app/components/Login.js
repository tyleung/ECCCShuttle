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
  static navigationOptions = {
    drawerLabel: '  Logout',
  };

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
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <StatusBar
            backgroundColor='black'
            />
            <Image source={require('./../../Assets/logo.png')} style={styles.image} />
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
                blurOnSubmit={ false }
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
                    <Text style={styles.button}>Sign up</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.c2} onPress={this.loginOnPress}>
                    <Text style={styles.button}>Login</Text>
                </TouchableOpacity>
            </View>
            <Modal isVisible={this.state.isModalVisible}>
                <TouchableOpacity style={{flex: 1, justifyContent:'center', alignItems: 'center', flexDirection:'row'}} activeOpacity={1} onPress={this._hideModal}>
                     <TouchableWithoutFeedback>
                        <View style={styles.signUpContainer}>
                            <Text style={[styles.ralewayLight, {fontSize:25, padding:28}]}>Sign up</Text>
                            <Text style={[styles.ralewayLight, {fontSize:18, paddingLeft:28}]}>Email:</Text>
                            <TextInput style={styles.signUpInput}
                                keyboardType='email-address'
                                multiline={false}
                                autoCapitalize='none'
                                autoCorrect={false}
                                blurOnSubmit={ false }
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
                                blurOnSubmit={ false }
                                returnKeyType='next'
                                underlineColorAndroid={'black'}
                                onSubmitEditing={() => this.signUpNameInput.focus()}
                                ref={(input) => this.signUpPasswordInput = input}
                            />
                            <Text style={[styles.ralewayLight, {fontSize:18, paddingLeft:28}]}>Name:</Text>
                            <TextInput style={styles.signUpInput}
                                keyboardType='default'
                                multiline={false}
                                autoCapitalize='words'
                                autoCorrect={false}
                                blurOnSubmit={ false }
                                returnKeyType='next'
                                underlineColorAndroid={'black'}
                                onSubmitEditing={() => this.signUpLicensePlateInput.focus()}
                                ref={(input) => this.signUpNameInput = input}
                            />
                            <Text style={[styles.ralewayLight, {fontSize:18, paddingLeft:28}]}>License plate:</Text>
                            <TextInput style={styles.signUpInput}
                                keyboardType='default'
                                multiline={false}
                                autoCapitalize='characters'
                                autoCorrect={false}
                                returnKeyType='go'
                                underlineColorAndroid={'black'}
                                ref={(input) => this.signUpLicensePlateInput = input}
                            />
                            <View style={styles.signUpPageButtonsContainer}>
                                <TouchableOpacity style={{paddingRight: 20}} onPress={this._hideModal}>
                                    <Text style={styles.buttonForSignUpPage}>CANCEL</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={this.createOnPress}>
                                    <Text style={styles.buttonForSignUpPage}>CREATE</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </TouchableWithoutFeedback> 
                </TouchableOpacity>
            </Modal>
        </KeyboardAvoidingView>
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
        resizeMode: 'contain',
        width: 280
    },
    logoLine: {
        marginTop: 2,
        width: 280,
        height: 0,
        borderBottomWidth: 1.5,
        borderColor: 'white',
    },
    title: {
        marginTop: 2,
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
        marginTop: 50,
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
        marginTop: 10,
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
        marginTop: 10,
        flexDirection: 'row',
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
        backgroundColor: 'white',
        borderRadius: 5,
        marginHorizontal: 5
    }, 
    signUpInput: {
        color: 'black',
        fontFamily: 'Raleway-Light',
        marginHorizontal: 28,
        textAlign: 'center',
        fontSize: 17
    },
    signUpPageButtonsContainer: {
        padding: 28,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    buttonForSignUpPage: {
        color: 'black',
        fontFamily: 'Raleway-Light',
        fontSize: 17,
    },
});