import React from 'react';
import { Text, View, Platform } from 'react-native';
import { loginStyle as style } from '../../../assets/styles';
import { buttonui as Logo } from '../../common/ui/buttonUi';
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
