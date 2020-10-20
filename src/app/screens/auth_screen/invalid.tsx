import React from 'react';
import { Text, View } from 'react-native';
import { loginStyle as style } from '../../../assets/styles';
import LoginWrapper from './loginWrapper';

const Invalid = () => {
  return (
    <LoginWrapper>
      <View style={style.buttonView}>
        <Text style={style.message}>
          Please contact novelty hr team to get your account.
        </Text>
      </View>
    </LoginWrapper>
  );
};

export default Invalid;
