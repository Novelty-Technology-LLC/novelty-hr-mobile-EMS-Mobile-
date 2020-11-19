import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { BackHandler, Text, TouchableOpacity, View } from 'react-native';
import { loginStyle as style } from '../../../assets/styles';
import { getCurrentRouteName } from '../../utils/navigation';
import LoginWrapper from './loginWrapper';

const Invalid = () => {
  const navigation = useNavigation();
  const onBackPress = () => {
    navigation.navigate('login');
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', onBackPress);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    };
  }, []);

  return (
    <LoginWrapper>
      <View style={style.buttonView}>
        <Text style={style.message}>
          Seems like your account is not activated. Please contact Novelty
          Technology.
        </Text>
      </View>
      <TouchableOpacity style={style.login} onPress={() => onBackPress()}>
        <Text style={style.buttonText}>Login with other email</Text>
      </TouchableOpacity>
    </LoginWrapper>
  );
};

export default Invalid;
