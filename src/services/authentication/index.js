import axios from "axios";
import { user } from "../../constants/endpoints";
import parseJWTPayload from "../../utils/parse-jwt-payload";

class Authentication {
  register({ firstName, lastName, email, password }: any) {
    const registerEndpoint = user.register();

    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
    return axios(`${API_BASE_URL}${registerEndpoint}`, {
      method: "POST",
      data: {
        firstName,
        lastName,
        email,
        password,
      },
    }).then((response) => {
      const accessToken = response.data.accessToken;
      localStorage.setItem("creds", accessToken);
    });
  }

  login({ email, password }: any) {
    const loginEndpoint = user.login();

    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
    return axios(`${API_BASE_URL}${loginEndpoint}`, {
      method: "POST",
      data: {
        email,
        password,
      },
    }).then((response) => {
      const accessToken = response.data.accessToken;
      localStorage.setItem("creds", accessToken);
    });
  }

  logout() {
    localStorage.removeItem("creds");
  }

  isAuthenticated() {
    let hasAccessTokenExpired;
    const accessToken = this.getAccessToken();
    if (accessToken) {
      const parsedToken = parseJWTPayload(accessToken);
      const { exp } = parsedToken;
      if (!exp) {
        hasAccessTokenExpired = true;
      } else {
        const now = Math.floor(Date.now() / 1000);
        hasAccessTokenExpired = exp < now;
      }
      return !hasAccessTokenExpired;
    } else {
      return false;
    }
  }

  getAccessToken() {
    return localStorage.getItem("creds");
  }

  getAccessTokenPayload() {
    const accessToken = this.getAccessToken();
    if (accessToken) {
      return parseJWTPayload(accessToken);
    }
    return null;
  }
}

export default Authentication;