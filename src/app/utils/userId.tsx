import AsyncStorage from '@react-native-community/async-storage';

export const setUser = async (user: object) => {
  return await AsyncStorage.setItem('user', JSON.stringify(user));
};

export const getUser = async () => {
  return await AsyncStorage.getItem('user');
};
