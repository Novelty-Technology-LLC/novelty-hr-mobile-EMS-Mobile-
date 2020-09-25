import React from 'react';
import { View, Text } from 'react-native';
import { header as Header } from '../../common/header';
import { headerText } from '../../../assets/styles';
import { approveRequest as style } from '../../../assets/styles';

import { TouchableOpacity } from 'react-native-gesture-handler';
import Button from '../../common/button';
import Request from '../../components/approveRequest/approve_request';

const ApproveRequest = ({ route }) => {
  const { date, id, sender, state, type } = route.params;

  const Approve = () => {};
  const Deny = () => {};

  return (
    <>
      <Header>
        <Text style={headerText}>{sender},</Text>
        <Text style={style.headerDate}>{date}</Text>
      </Header>
      <Request data={route.params} style={style} />
      <View style={style.buttonView}>
        <Button
          title="Approve"
          style={style.buttonApprove}
          onPress={() => Approve()}
        />
        <Button title="Deny" style={style.buttonDeny} onPress={() => Deny()} />
      </View>
    </>
  );
};

export { ApproveRequest };
