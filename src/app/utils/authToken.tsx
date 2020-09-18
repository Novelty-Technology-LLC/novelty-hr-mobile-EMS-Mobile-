import AsyncStorage from '@react-native-community/async-storage';

const mapObject = (profile) => {
  let storeData = {
    email: null,
    givenName: null,
    familyName: null,
    photo: null,
    token: null,
  };

  for (let keys in profile) {
    if (storeData.hasOwnProperty(keys)) {
      storeData[keys] = profile[keys];
    } else {
      if (keys === 'fullName') {
        return mapObject(profile[keys]);
      }
    }
  }
  return storeData;
};

const getToken = async () => {
  return await AsyncStorage.getItem('token');
};

const storeToken = async (profile: String) => {
  let data = mapObject(profile);
  return await AsyncStorage.setItem('token', JSON.stringify(data));
};

const removeToken = async () => {
  return await AsyncStorage.removeItem('token');
};

export { getToken, storeToken, removeToken };
