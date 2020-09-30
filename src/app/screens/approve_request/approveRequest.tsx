import React from 'react';
import { View, Text } from 'react-native';
import { header as Header } from '../../common/header';
import { headerText } from '../../../assets/styles';
import { approveRequest as style } from '../../../assets/styles';

import { button as Button } from '../../common';
import Request from '../../components/approveRequest/approve_request';

const ApproveRequest = ({ route }: any) => {
  const { leave_date } = route.params;
  const { first_name, last_name } = route.params.user;

  const Approve = (res) => {
    route.params['state'] = res;
  };
  const Deny = (res) => {
    route.params['state'] = res;
  };

  return (
    <>
      <Header>
        <Text style={headerText}>
          {first_name + last_name > 14
            ? first_name + ' ' + last_name.substr(0, 14 - 2) + '...'
            : first_name + ' ' + last_name}
          ,
        </Text>
        <Text style={style.headerDate}>{leave_date.startDate}</Text>
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
