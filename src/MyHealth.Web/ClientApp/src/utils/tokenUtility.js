import { GetDataFromStore, SaveDataToStore } from "./storageHelper";
import shortid from "shortid";
var jwtDecoder = require("jwt-decode");

export const decodedToken = () => {
  try {
    const token = localStorage.getItem("token");
    let decodedToken = jwtDecoder(token);
    return {
      isLoggedIn: decodedToken.sub != "" ? true : false,
      userName: decodedToken.UserName,
      email: decodedToken.email,
      firstName: decodedToken.FirstName,
      lastName: decodedToken.LastName,
      role: decodedToken.role,
      userId: decodedToken.sub,
      isAdmin: decodedToken.IsAdmin,
      contactNumber: decodedToken.ContactNumber,
    };
  } catch (error) {
    throw error;
  }
};

export const getUserIdFromToken = () => {
  try {
    const token = localStorage.getItem("token");
    let decodedToken = jwtDecoder(token);
    return {
      userId: decodedToken.sub,
    };
  } catch (error) {
    //throw error;
    return {
      userId: null,
    };
  }
};

export const getUserInfo = () => {
  try {
    const userInfo = GetDataFromStore("user");
    return {
      userInfo,
    };
  } catch (error) {
    //throw error;
    return {
      userId: null,
    };
  }
};

// Setup config with token - helper function
export const tokenConfig = (getState) => {
  // Get token from state
  const token = localStorage.getItem("token");
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  // If token, add to headers config
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
};

export const getAnonymousUser = () => {
  let userInfo = GetDataFromStore("user");
  if (userInfo === null) {
    let userid = "anonymous-" + shortid.generate().substring(0, 10);
    userInfo = {
      contactNumber: "",
      email: "",
      firstName: "",
      isAdmin: false,
      lastName: "",
      role: null,
      userId: userid,
      userName: "anonymoususer",
    };

    SaveDataToStore("user", userInfo);
  }
  return userInfo;
};
