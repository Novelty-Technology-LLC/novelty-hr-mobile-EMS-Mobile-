import AsyncStorage from '@react-native-community/async-storage';

const getToken = async () => {
  return await AsyncStorage.getItem('token');
};

const storeToken = async (token) => {
  return await AsyncStorage.setItem('token', token);
};

const removeToken = async () => {
  return await AsyncStorage.removeItem('token');
};

export { getToken, storeToken, removeToken };
