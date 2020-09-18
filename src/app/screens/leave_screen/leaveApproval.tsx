import React, { useContext } from 'react';
import { Text, View } from 'react-native';
import { header as Header } from '../../common/header';
import Async from '@react-native-community/async-storage';
import { AuthContext } from '../../reducer';

const LeaveApproval = () => {
  const { dispatch } = useContext(AuthContext);
  return (
    <View>
      <Header>Biren Gurung </Header>
      <Text
        onPress={async () => {
          await Async.removeItem('token');
          dispatch({ type: 'SIGN_OUT' });
        }}
      >
        Logout
      </Text>
    </View>
  );
};

export { LeaveApproval };
