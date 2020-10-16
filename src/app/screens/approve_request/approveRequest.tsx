import React, { useContext, useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { header as Header } from '../../common/header';
import { headerText } from '../../../assets/styles';
import { approveRequest as style } from '../../../assets/styles';
import Request from '../../components/approveRequest/approve_request';
import getName from '../../utils/getName';

const ApproveRequest = ({ route }: any) => {
  let { dayRange } = getDay(route.params);
  let { name } = getName(route.params);

  return (
    <>
      <Header icon={true}>
        <View style={style.headContainer}>
          <View>
            <Text style={headerText}>{name},</Text>
          </View>
          <View style={style.headerGap}>
            <Text style={style.headerDate}>{dayRange}</Text>
          </View>
        </View>
      </Header>
      <Request data={route.params} style={style} title="admin" />
    </>
  );
};

export { ApproveRequest };
