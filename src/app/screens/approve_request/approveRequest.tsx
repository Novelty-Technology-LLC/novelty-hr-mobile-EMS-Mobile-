import React from 'react';
import { View, Text } from 'react-native';
import { header as Header } from '../../common/header';
import { headerText } from '../../../assets/styles';
import { approveRequest as style } from '../../../assets/styles';

import Request from '../../components/approveRequest/approve_request';
import { ApproveDeny } from '../../components';

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
        <ApproveDeny
          title="Approve"
          style={style.buttonApprove}
          item={route.params}
        />
        <ApproveDeny
          title="Deny"
          style={style.buttonDeny}
          item={route.params}
        />
      </View>
    </>
  );
};

export { ApproveRequest };
