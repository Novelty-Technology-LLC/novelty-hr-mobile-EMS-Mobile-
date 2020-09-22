import React from 'react';
import { View, Text } from 'react-native';
import { header as Header } from '../../common/header';

const RequestDetail = ({ route }) => {
  const { date, id, sender, state, type } = route.params;
  return (
    <View>
      <Header>Hello</Header>
    </View>
  );
};

export { RequestDetail };
