import React from 'react';
import { View, Text } from 'react-native';
import { loginStyle } from '../../../assets/styles';
import LoginWrapper from './loginWrapper';

const Loading = () => {
  return (
    <LoginWrapper>
      <View style={loginStyle.buttonView}>
        <Text style={loginStyle.buttonText}>Please wait ..</Text>
      </View>
    </LoginWrapper>
  );
};

export default Loading;
