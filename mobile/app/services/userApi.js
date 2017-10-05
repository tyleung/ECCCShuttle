import { AsyncStorage } from "react-native";

export default class UserApi {
  static API_TOKEN = "API_TOKEN";

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
        }

        return responseData;
      })
      .catch(e => {
        console.log("Login error.");
        throw e;
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
}
