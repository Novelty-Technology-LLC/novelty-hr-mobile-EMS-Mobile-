import React from 'react';
import { View, Text } from 'react-native';
import { header as Header } from '../../common/header';
import { headerText } from '../../../assets/styles';

const RequestDetail = ({ route }) => {
  const { date, id, sender, state, type } = route.params;
  return (
    <View>
      <Header>
        <Text style={headerText}>Hello</Text>
      </Header>
    </View>
  );
};

export { RequestDetail };
