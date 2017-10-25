import React from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
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
    
    alert(`type: ${type}, decrypted: ${decrypted}`);
  };

  render() {
    const { hasCameraPermission } = this.state;

    if (hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      const { navigate } = this.props.navigation;
      return (
        <View style={{ flex: 1 }}>
          <BarCodeScanner
            onBarCodeRead={this._handleBarCodeRead}
            barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
            style={StyleSheet.absoluteFill}
          >
            <View style={styles.customRectangleContainer}>
              <View style={styles.customOutsideMarker}>
                <Text style={styles.customTitleText}>Scan QR Code</Text>
              </View>
              <View style={{ height: 250, flexDirection: "row" }}>
                <View style={styles.customOutsideMarker} />
                <View style={styles.customRectangle} />
                <View style={styles.customOutsideMarker} />
              </View>
              <View
                style={[
                  styles.customOutsideMarker,
                  { justifyContent: "flex-end", alignItems: "center" }
                ]}
              >
                <TouchableOpacity
                  style={{ marginBottom: 50 }}
                  onPress={() => navigate("MainScreen")}
                >
                  <Text style={styles.customBottomText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </BarCodeScanner>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  zeroContainer: {
    height: 0,
    flex: 0
  },
  customRectangleContainer: {
    flex: 0,
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
    flexDirection: "column"
  },
  customRectangle: {
    height: 250,
    width: 250,
    borderWidth: 1,
    borderColor: "white",
    backgroundColor: "transparent"
  },
  customOutsideMarker: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)"
  },
  customTitleText: {
    color: "white",
    fontSize: 22,
    textAlign: "center",
    marginTop: 20
  },
  customBottomText: {
    color: "white",
    fontSize: 22
  }
});
