import React, { useContext } from 'react';
import { Text, View } from 'react-native';
import Async from '@react-native-community/async-storage';
import { AuthContext } from '../../reducer';
import { headerText } from '../../../assets/styles';
import { header as Header } from '../../common';

const DashBoard = () => {
  const { dispatch } = useContext(AuthContext);
  return (
    <View>
      <Header icon={false}>
        <Text style={headerText}>DASHBOARD</Text>
      </Header>
    </View>
  );
};

export { DashBoard };
