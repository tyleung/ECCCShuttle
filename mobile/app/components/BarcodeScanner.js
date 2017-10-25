import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { BarCodeScanner, Permissions } from "expo";
import CryptoJSAesJson, { CRYPTO_KEY } from "../utils/CryptoJSAesJson";

const CryptoJS = require("crypto-js");

export default class BarcodeScannerExample extends React.Component {
  state = {
    hasCameraPermission: null
  };

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === "granted" });
  }

  _handleBarCodeRead = ({ type, data }) => {
    const decrypted = JSON.parse(
      CryptoJS.AES
        .decrypt(data, CRYPTO_KEY, {
          format: CryptoJSAesJson
        })
        .toString(CryptoJS.enc.Utf8)
    );
    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    alert(`type: ${type}, decrypted: ${decrypted}`);
  };

  render() {
    const { hasCameraPermission } = this.state;

    if (hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <BarCodeScanner
            onBarCodeRead={this._handleBarCodeRead}
            barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
            style={StyleSheet.absoluteFill}
          />
        </View>
      );
    }
  }
}
