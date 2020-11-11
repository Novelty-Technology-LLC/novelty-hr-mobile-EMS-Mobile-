import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { loginStyle as style } from '../../../assets/styles';
import LoginWrapper from './loginWrapper';

const Invalid = () => {
  const navigation = useNavigation();

  return (
    <LoginWrapper>
      <View style={style.buttonView}>
        <Text style={style.message}>
          Seems like your account is not activated. Please contact Novelty
          Technology.
        </Text>
      </View>
      <TouchableOpacity
        style={style.login}
        onPress={() => navigation.navigate('login')}
      >
        <Text style={style.buttonText}>Login again</Text>
      </TouchableOpacity>
    </LoginWrapper>
  );
};

export default Invalid;
