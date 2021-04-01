import React, { useContext } from 'react';
import { Text, View } from 'react-native';
import Async from '@react-native-community/async-storage';
import { AuthContext } from '../../reducer';
import { headerText } from '../../../assets/styles';
import { header as Header } from '../../common';
import colors from '../../../assets/colors';

const DashBoard = () => {
  const { state } = useContext(AuthContext);
  console.log('state -> ', state.user.first_name);

  return (
    <View style={{ flex: 1 }}>
      <Header icon={false}>
        <Text style={headerText}>DASHBOARD</Text>
      </Header>
      <View
        style={{
          flex: 1,
          backgroundColor: colors.white,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text style={{ fontWeight: '700', fontSize: 40 }}>Hello</Text>
        <Text style={{ fontSize: 20 }}>
          {state.user.first_name + ' ' + state.user.last_name}
        </Text>
      </View>
    </View>
  );
};

export { DashBoard };
