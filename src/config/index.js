import axios from "axios";
/**
 * Creates a config object with commonly used URLs or keys throughout the application
 * Allows for single spot updating of frequently used information across components
 * axiosWithAuth returns an axios instance with the authorization headers and baseURL
 */
export const config = {
  apiUrl: "http://127.0.0.1:8000",
  axiosWithAuth: function() {
    return axios.create({
      baseURL: this.apiUrl,
      headers: {
        Authorization: `Token ${localStorage.getItem("authToken")}`
      }
    });
  }
  //   apiUrl: "https://lambda-mud-test.herokuapp.com"
};

export default config;
