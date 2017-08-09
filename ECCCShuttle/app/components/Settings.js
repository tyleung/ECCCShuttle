import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  StatusBar,
  View,
  Text,
  ToolbarAndroid,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import Modal from 'react-native-modal'


export default class Settings extends Component {
  static navigationOptions = {
    drawerLabel: '  Settings',
  };

  state = {
    isModalVisible: false
  }
  
  _showModal = () => this.setState({ isModalVisible: true })
  _hideModal = () => this.setState({ isModalVisible: false })

  render() {
    return (
        <View style={styles.container}>
          <ToolbarAndroid
            style={styles.toolbar}
            title=" Settings"
            titleColor='white'
            navIcon={require('./../../Assets/navicon.png')}
            onIconClicked={() => this.props.navigation.navigate('DrawerOpen')}
            />
          <StatusBar
            backgroundColor='black'
            />
          <View style={{marginVertical: 30, marginLeft: 40}}>
            <Image source={require('./../../Assets/profileGrey.png')} style={styles.profileIcon} />
          </View>
          <TouchableOpacity style={[styles.profileContainer, {borderTopWidth: 1, borderBottomWidth: 1}]}>
              <View style={{flex: 1}}>
                <Text style={[styles.ralewayLight, styles.profileText]}>
                    tongtongcanopus@gmail.com
                </Text>
              </View>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.profileContainer, {borderBottomWidth: 1}]}>
              <View style={{flex: 1}}>
                <Text style={[styles.ralewayLight, styles.profileText]}>
                    Canopus Tong
                </Text>
              </View>
              <View style={{alignItems: 'flex-end', marginHorizontal: 15, justifyContent: 'center'}}>
                  <Image source={require('./../../Assets/pencil.png')} style={styles.pencilIcon} />
              </View>
          </TouchableOpacity>
          <View style={{flex: 1, justifyContent: 'flex-end'}}>
            <TouchableOpacity style={[styles.profileContainer, {borderTopWidth: 1, borderBottomWidth: 1, marginBottom: 30}]} onPress={this._showModal}>
                <View style={{flex: 1}}>
                    <Text style={[styles.ralewayLight, {fontSize: 17, color: 'red', paddingLeft: 21, paddingVertical: 13}]}>
                        Remove My Account
                    </Text>
                </View>
                <View style={{alignItems: 'flex-end', marginHorizontal: 15, justifyContent: 'center'}}>
                    <Image source={require('./../../Assets/deleteAccount.png')} style={styles.pencilIcon} />
                </View>
            </TouchableOpacity>
          </View>
        <Modal isVisible={this.state.isModalVisible}>
            <TouchableOpacity style={{flex: 1, justifyContent: 'center'}} activeOpacity={1} onPress={this._hideModal}>
                <TouchableWithoutFeedback>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Remove Account?</Text>
                        <Text style={styles.modalText}>Removing this account will permanently delete all of its data from the datebase. This includes all ride history, collected points, license plate number, etc. Do you want to continue?</Text>
                        <View style={styles.modalButtonsContainer}>
                            <View style={{flex:1}}>
                                <View style={styles.modalButtonContainer}>
                                    <TouchableOpacity onPress={this._hideModal}>
                                        <Text style={styles.modalButtonText}>CANCEL</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={{flex:1}}>
                                <View style={styles.modalButtonContainer}>
                                    <TouchableOpacity>
                                        <Text style={styles.modalButtonText}>REMOVE</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </TouchableOpacity>
        </Modal>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#F5F5F5'
  },
   profileContainer:{
    flexDirection: 'row',
    backgroundColor: 'white',
    borderColor: '#223E4A',
  },
  ralewayLight: {
    fontFamily: 'Raleway-Light'
  },
  ralewayLightItalic: {
    fontFamily: 'Raleway-LightItalic'
  },
  toolbar: {
   backgroundColor: 'black',
   height: 56,
   alignSelf: 'stretch',
  },
  profileText: {
    fontSize: 22,
    color: 'black', 
    paddingLeft: 21, 
    paddingVertical: 17
  },
  pencilIcon: {
    resizeMode: 'contain',
    width: 30,
    height: 30,
  },
  profileIcon: {
    resizeMode: 'contain',
    width: 70,
    height: 70,
  },
  modalContainer: {
        backgroundColor: 'white',
        borderRadius: 5
  },
  modalTitle: {
        fontFamily: 'Raleway-Medium',
        fontSize: 22,
        padding: 15,
        paddingTop: 20,
        color: 'red'
  },
  modalText: {
        fontFamily: 'Raleway-Light',
        fontSize: 18,
        paddingHorizontal: 15,
  },
  modalButtonsContainer: {
        flexDirection: 'row',
        paddingVertical: 15,
  },
  modalButtonContainer: {
      justifyContent: 'center',
      alignItems: 'center'
  },
  modalButtonText: {
      fontFamily: 'Raleway-Medium',
      fontSize: 18,
  },
});
