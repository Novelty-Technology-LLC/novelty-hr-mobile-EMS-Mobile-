import React from 'react';
import { Text, View } from 'react-native';
import { headerTxtStyle } from '../../../assets/styles';
import { tabHeader as Header } from '../../common';

const Detail = () => {
  return (
    <View style={{ flex: 1 }}>
      <Header>
        <Text style={headerTxtStyle.headerText}>DETAIL PAGE</Text>
      </Header>
      <Text>Detail</Text>
    </View>
  );
};

export { Detail };
