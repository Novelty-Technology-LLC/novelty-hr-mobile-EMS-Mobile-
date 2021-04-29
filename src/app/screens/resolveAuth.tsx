import React, { useEffect } from 'react';
import { getToken } from '../utils';

const ResolveAuth = ({ navigation }: { navigation: any }) => {
  useEffect(() => {
    const tryLocalSignIn = async () => {
      try {
        let userToken = await getToken();
        if (userToken) {
          navigation.navigate('BottomTabs');
        } else {
          navigation.navigate('login');
        }
      } catch (e) {
        console.log(e);
      }
    };

    tryLocalSignIn();
  }, []);

  return null;
};

export { ResolveAuth };
