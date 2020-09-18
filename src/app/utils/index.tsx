import AsyncStorage from '@react-native-community/async-storage';

const getToken = async () => {
  return await AsyncStorage.getItem('token');
};

const storeToken = async (jsonValue) => {
  return await AsyncStorage.setItem('token', jsonValue);
};

export { getToken, storeToken };
