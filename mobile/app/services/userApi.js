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
    console.log(email, password);

    fetch("http://shuttle.eccc.ca/api/v1/auth/login", fetchOptions)
      .then(response => response.json())
      .then(responseData => {
        if (responseData.token) {
          AsyncStorage.setItem(UserApi.API_TOKEN, responseData.token);
        }

        return responseData;
      })
      .catch(e => {
        console.log('Login error.');
        console.log(e);
      });
  };

  /*
  onSignIn = () => AsyncStorage.setItem(UserApi.API_TOKEN, "true");

  onSignOut = () => AsyncStorage.removeItem(USER_KEY);

  isSignedIn = () => {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem(USER_KEY)
        .then(res => {
          if (res !== null) {
            resolve(true);
          } else {
            resolve(false);
          }
        })
        .catch(err => reject(err));
    });
  };
  */
}
