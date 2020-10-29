import React from 'react';
import { View, Text } from 'react-native';
import { headerText } from '../../../assets/styles';
import { header as Header } from '../../common';
import { RequestButton } from '../../components/requestButton';

const TimeLog = () => {
  return (
    <>
      <Header>
        <Text style={headerText}>Time Log</Text>
      </Header>
      <View>
        <Text>Time Log</Text>
      </View>
      <RequestButton screen="logtime" />
    </>
  );
};

export { TimeLog };
