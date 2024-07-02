import axios from "axios";
import EventEmitter from "./EventEmitter"
import jwtServiceConfig from "./jwtServiceConfig"
import { jwtDecode } from "jwt-decode";


class JwtService extends EventEmitter {
  init() {
    this.setInterceptors();
    this.handleAuthentication();
  }

  setInterceptors = () => {
    axios.interceptors.response.use(
      (response) => response, // a normal response that is okay

      // user is not permitted to see this response due to auth
      (err) => {
        return new Promise((resolve, reject) => {
          if (
            err.response.status === 401 &&
            err.config &&
            !err.config.__isRetryRequest
          ) {
            this.emit("onAutoLogout", "Invalid access token");
            this.setSession(null);
          }
          throw err;
        });
      },
    );
  };

  handleAuthentication = () => {
    const accessToken = this.getAccessToken();

    if (!accessToken) {
      this.emit("onNoAccessToken");
      return;
    }

    if (this.isAuthTokenValid(accessToken)) {
      this.setSession(accessToken);
      this.emit("onAutoLogin");
    } else {
      this.setSession(null);
      this.emit("onAutoLogout", "access token expired");
    }
  };

  sendToken = async (data) => {
    try {
      console.log({ data });
      const response = await axios.post(jwtServiceConfig.sendToken, data);
      return response.data;
    } catch (err) {
      throw err.response?.data || err.message;
    }
  };

  loginWithToken = async () => {
    try {
      const accessToken = this.getAccessToken();
      const response = await axios.post(jwtServiceConfig.refresh, {
        accessToken,
      });
      console.log(response.data);
      return response.data;
    } catch (err) {
      throw err.response?.data || err.message;
    }
  };

  loginUser = (data) => {
    return new Promise((resolve, reject) => {
      axios
        .post(jwtServiceConfig.login, data)
        .then((response) => {
          this.setSession(response.data.accessToken);
          resolve(response.data.user);
          this.emit("onLogin", response.data.user);
        })
        .catch((err) => {
          reject(err.response.data);
        });
    });
  };

  logoutUser = () => {
    this.setSession(null);
    this.emit("onLogout");
  };

  loginUserWithGoogleToken = (googleAccessToken) => {
    return new Promise((resolve, reject) => {
      axios
        .post(jwtServiceConfig.loginpWithToken, {
          googleAccessToken: googleAccessToken.access_token,
        })
        .then((response) => {
          console.log(response.data);
          this.setSession(response.data.accessToken);
          resolve(response.data.user);
          this.emit("onLogin", response.data.user);
        })
        .catch((err) => {
          reject(err.response.data);
        });
    });
  };

  setSession = (accessToken) => {
    if (accessToken) {
      localStorage.setItem("jwtAccessToken", accessToken);
      axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    } else {
      localStorage.removeItem("jwtAccessToken");
      delete axios.defaults.headers.common.Authorization;
    }
  };

  isAuthTokenValid = (accessToken) => {
    if (!accessToken) {
      return false;
    }

    const decoded = jwtDecode(accessToken);

    const currentTime = Date.now() / 1000;

    if (decoded.exp < currentTime) {
      console.warn("acces token expired");
      return false;
    }

    return true;
  };

  getAccessToken = () => {
    return localStorage.getItem("jwtAccessToken");
  };
}

const instance = new JwtService();

export default instance;