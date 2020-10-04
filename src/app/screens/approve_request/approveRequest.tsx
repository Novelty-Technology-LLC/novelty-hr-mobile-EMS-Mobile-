import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { header as Header } from '../../common/header';
import { headerText } from '../../../assets/styles';
import { approveRequest as style } from '../../../assets/styles';
import Request from '../../components/approveRequest/approve_request';
import { ApproveDeny } from '../../components';
import getName from '../../components/approveRequest/getName';

const ApproveRequest = ({ route }: any) => {
  let { dayRange, day } = getDay(route.params);
  let { name } = getName(route.params);

  return (
    <>
      <Header>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text>
            <Text style={headerText}>{name},</Text>
          </Text>
          <Text>
            <Text style={style.headerDate}>{dayRange}</Text>
          </Text>
        </View>
      </Header>
      <Request data={route.params} style={style} />
      <View style={style.buttonView}>
        <ApproveDeny title="Approve" style={style} item={route.params} />
        <ApproveDeny title="Deny" style={style} item={route.params} />
      </View>
    </>
  );
};

export { ApproveRequest };
