import AsyncStorage from '@react-native-community/async-storage';

const getToken = async () => {
  return await AsyncStorage.getItem('token');
};

const storeToken = async (jsonValue: String) => {
  return await AsyncStorage.setItem('token', jsonValue);
};

const removeToken = async () => {
  return await AsyncStorage.removeItem('token');
};

export { getToken, storeToken, removeToken };
