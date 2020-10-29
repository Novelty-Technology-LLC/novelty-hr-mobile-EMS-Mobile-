import React from 'react';
import { View, Text } from 'react-native';
import { headerText } from '../../../assets/styles';
import { header as Header } from '../../common';

const LogTime = () => {
  return (
    <>
      <Header icon={true}>
        <Text style={headerText}> Log Time</Text>
      </Header>
      <View>
        <Text>Log Time</Text>
      </View>
    </>
  );
};

export { LogTime };
