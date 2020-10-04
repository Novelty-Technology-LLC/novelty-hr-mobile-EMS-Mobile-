import AsyncStorage from '@react-native-community/async-storage';

export const setIsApprover = async (id: number) => {
  return await AsyncStorage.setItem('isapprover', id);
};

export const getIsApprover = async () => {
  return await AsyncStorage.getItem('isapprover');
};
