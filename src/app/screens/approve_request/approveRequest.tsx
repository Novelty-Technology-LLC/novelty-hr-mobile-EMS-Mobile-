import React from 'react';
import { Text, View } from 'react-native';
import { header as Header } from '../../common/header';
import { approveRequest as style } from '../../../assets/styles';

const ApproveRequest = ({ route }) => {
  const { date, id, sender, state, type } = route.params;

  return (
    <View>
      <Header>Hello</Header>
    </View>
  );
};

export { ApproveRequest };
