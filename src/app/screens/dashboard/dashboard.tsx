import React, { useContext } from 'react';
import { Text, View } from 'react-native';
import Async from '@react-native-community/async-storage';
import { AuthContext } from '../../reducer';
import { headerText } from '../../../assets/styles';
import { header as Header } from '../../common';
import colors from '../../../assets/colors';

const DashBoard = () => {
  const { dispatch } = useContext(AuthContext);
  return (
    <View style={{ flex: 1 }}>
      <Header icon={false}>
        <Text style={headerText}>DASHBOARD</Text>
      </Header>
      <View style={{ flex: 1, backgroundColor: colors.white }}>
        <Text>Hello from DashBoard</Text>
      </View>
    </View>
  );
};

export { DashBoard };
