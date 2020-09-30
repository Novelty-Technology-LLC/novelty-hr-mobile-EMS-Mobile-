import React from 'react';
import { View, Text } from 'react-native';
import { header as Header } from '../../common/header';
import { headerText } from '../../../assets/styles';
import { approveRequest as style } from '../../../assets/styles';

import { button as Button } from '../../common';
import Request from '../../components/approveRequest/approve_request';
import getDay from '../../components/approveRequest/getDay';
import getName from '../../components/approveRequest/getName';

const ApproveRequest = ({ route }: any) => {
  const { first_name, last_name } = route.params.user;

  let { dayRange, day } = getDay(route.params);
  let { name } = getName(route.params);

  const Approve = (res) => {
    route.params['state'] = res;
  };
  const Deny = (res) => {
    route.params['state'] = res;
  };

  return (
    <>
      <Header>
        <Text style={headerText}>{name},</Text>
        <Text style={style.headerDate}>
          {dayRange} ({day > 1 ? day + ' days' : (day = 1 + ' day')})
        </Text>
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
