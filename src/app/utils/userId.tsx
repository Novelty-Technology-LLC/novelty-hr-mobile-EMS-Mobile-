import AsyncStorage from '@react-native-community/async-storage';

export const setId = async (id: string) => {
  return await AsyncStorage.setItem('userid', id);
};

export const getId = async () => {
  return await AsyncStorage.getItem('userid');
};
