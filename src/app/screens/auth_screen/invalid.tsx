import React from 'react';
import { Text, View } from 'react-native';
import { loginStyle as style } from '../../../assets/styles';
import LoginWrapper from './loginWrapper';

const Invalid = () => {
  return (
    <LoginWrapper>
      <View style={style.buttonView}>
        <Text style={style.message}>
          Seems like your account is not activated.
          Please contact Novelty Technology.
        </Text>
      </View>
    </LoginWrapper>
  );
};

export default Invalid;
