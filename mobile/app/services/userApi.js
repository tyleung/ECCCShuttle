import { AsyncStorage } from "react-native";

export default class UserApi {
  static API_TOKEN = "API_TOKEN";
  static USER = "USER";
  static USER_TRANSACTIONS = "USER_TRANSACTIONS";

  static login = (email, password) => {
    const fetchOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,
        password
      })
    };

    return fetch("http://shuttle.eccc.ca/api/v1/auth/login", fetchOptions)
      .then(response => response.json())
      .then(responseData => {
        if (responseData.token) {
          AsyncStorage.setItem(UserApi.API_TOKEN, responseData.token);
          return responseData.token;
        } else {
          throw Error("Login error.");
        }
      })
      .catch(e => console.log(e));
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
  };

  static getUser = token => {
    const fetchOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    };

    return fetch("http://shuttle.eccc.ca/api/v1/user", fetchOptions)
      .then(response => response.json())
      .then(responseData => {
        if (responseData.user) {
          AsyncStorage.setItem(UserApi.USER, JSON.stringify(responseData.user));
          return responseData.user;
        } else {
          throw Error("Get user error.");
        }
      })
      .catch(e => console.log(e));
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
    const fetchOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    };

    return fetch(`http://shuttle.eccc.ca/api/v1/users/${userId}/transactions`, fetchOptions)
      .then(response => response.json())
      .then(responseData => {
        if (responseData) {
          AsyncStorage.setItem(UserApi.USER_TRANSACTIONS, JSON.stringify(responseData));
          return responseData;
        } else {
          throw Error("Get user transactions error.");
        }
      })
      .catch(e => console.log(e));
  };
}
