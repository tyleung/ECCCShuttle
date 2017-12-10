import { NetInfo } from "react-native";
import Storage from "../services/storage";

export default class Helpers {
  static isSynced = async () => {
    const storedUserTransactions = await Storage.getStoredUserTransactions();
    const hasUnsyncedItems = storedUserTransactions.some(t => !t.id);
    return !hasUnsyncedItems;
  };

  // https://github.com/facebook/react-native/issues/8615
  static isNetworkConnected = () => {
    return NetInfo.getConnectionInfo().then(reachability => {
      if (reachability.type === "unknown") {
        return new Promise(resolve => {
          const handleFirstConnectivityChangeIOS = isConnected => {
            NetInfo.isConnected.removeEventListener(
              "connectionChange",
              handleFirstConnectivityChangeIOS
            );
            resolve(isConnected);
          };
          NetInfo.isConnected.addEventListener(
            "connectionChange",
            handleFirstConnectivityChangeIOS
          );
        });
      }
      return reachability.type !== "none" && reachability.type !== "unknown";
    });
  };
}
