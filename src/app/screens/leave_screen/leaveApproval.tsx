import React, { useContext } from 'react';
import { Text, View } from 'react-native';
import { header as Header } from '../../common/header';
import Async from '@react-native-community/async-storage';
import { AuthContext } from '../../reducer';
import { headerText } from '../../../assets/styles';

const LeaveApproval = () => {
  const { dispatch } = useContext(AuthContext);
  return (
    <View>
      <Header>
        <Text style={headerText}>Hello</Text>
      </Header>
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
