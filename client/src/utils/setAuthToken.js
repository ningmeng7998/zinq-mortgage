//Set default header for axios
import axios from "axios";

//When the user logs in, get the token and set the token on the header for private path request
const setAuthToken = token => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

export default setAuthToken;
