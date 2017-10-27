import { AsyncStorage } from "react-native";
import axios from "axios";

export default class UserApi {
  static API_TOKEN = "API_TOKEN";
  static USER = "USER";
  static USER_TRANSACTIONS = "USER_TRANSACTIONS";

  static login = (email, password) => {
    return axios
      .post("http://shuttle.eccc.ca/api/v1/auth/login", {
        email,
        password
      })
      .then(response => {
        AsyncStorage.setItem(UserApi.API_TOKEN, response.data.token);
        return response.data.token;
      })
      .catch(error => {
        console.log(error);
      });
  };

  static isLoggedIn = () => {
    return AsyncStorage.getItem(UserApi.API_TOKEN)
      .then(res => {
        return res !== null;
      })
      .catch(e => {
        throw e;
      });
  };

  static logout = async () => {
    await AsyncStorage.removeItem(UserApi.API_TOKEN);
  };

  static signUp = user => {
    /*
    const fetchOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    };

    return fetch("http://shuttle.eccc.ca/api/v1/users", fetchOptions)
      .then(response => response.json())
      .then(responseData => {
        return responseData;
      })
      .catch(e => {
        console.log("Sign up error.");
        throw e;
      });
      */

    return axios
      .post("http://shuttle.eccc.ca/api/v1/users", user)
      .then(response => {
        console.log("alsdhakhdakjdhasiSINGUPO");
        console.log(response.data);
        return response.data;
      })
      .catch(error => {
        console.log(error);
      });
  };

  static getUser = token => {
    return axios
      .get("http://shuttle.eccc.ca/api/v1/user", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        if (response.data.user) {
          AsyncStorage.setItem(
            UserApi.USER,
            JSON.stringify(response.data.user)
          );
          return response.data.user;
        } else {
          throw Error("Get user error.");
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  static getStoredUser = async () => {
    try {
      const user = await AsyncStorage.getItem(UserApi.USER);
      if (user !== null) {
        return JSON.parse(user);
      } else {
        throw Error("User not found in localstorage.");
      }
    } catch (e) {
      console.log(e);
      return false;
    }
  };

  static getUserTransactions = async userId => {
    const token = await AsyncStorage.getItem(UserApi.API_TOKEN);
    return axios
      .get(`http://shuttle.eccc.ca/api/v1/users/${userId}/transactions`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        AsyncStorage.setItem(
          UserApi.USER_TRANSACTIONS,
          JSON.stringify(response.data)
        );

        return response.data;
      })
      .catch(error => {
        console.log(error);
      });
  };
}
