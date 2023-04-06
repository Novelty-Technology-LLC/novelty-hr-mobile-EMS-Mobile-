import AsyncStorage from "@react-native-community/async-storage";

const getToken = async () => {
  return await AsyncStorage.getItem("token");
};

const storeToken = async (token) => {
  return await AsyncStorage.setItem("token", token);
};

const initialLogin = async (token: string) => {
  return await AsyncStorage.setItem("initial", token);
};

const getInitialLogin = async () => {
  return await AsyncStorage.getItem("initial");
};

const removeToken = async () => {
  return await AsyncStorage.removeItem("token");
};

export { getToken, storeToken, removeToken, initialLogin, getInitialLogin };
