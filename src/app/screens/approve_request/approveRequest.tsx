import React from 'react';
import { View, Text } from 'react-native';
import { header as Header } from '../../common/header';
import { headerText } from '../../../assets/styles';
import { approveRequest as style } from '../../../assets/styles';

import { button as Button } from '../../common';
import Request from '../../components/approveRequest/approve_request';

const ApproveRequest = ({ route }: any) => {
  const { date, id, sender, state, type } = route.params;

  const Approve = (res) => {
    route.params['state'] = res;
    console.log('state -> ', route.params);
  };
  const Deny = (res) => {
    route.params['state'] = res;
    console.log('state -> ', route.params);
  };

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
          onPress={() => Approve('Approved')}
        />
        <Button
          title="Deny"
          style={style.buttonDeny}
          onPress={() => Deny('Denied')}
        />
      </View>
    </>
  );
};

export { ApproveRequest };
