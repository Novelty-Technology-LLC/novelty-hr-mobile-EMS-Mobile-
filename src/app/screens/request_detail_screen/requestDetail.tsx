import React from 'react';
import { View, Text } from 'react-native';
import { header as Header } from '../../common/header';
import { headerText } from '../../../assets/styles';
import Request from '../../components/approveRequest/approve_request';
import { approveRequest as style } from '../../../assets/styles';

const RequestDetail = ({ route }) => {
  const { date } = route.params;
  return (
    <>
      <Header>
        <Text style={headerText}>{date}</Text>
      </Header>
      <Request data={route.params} style={style} />
    </>
  );
};

export { RequestDetail };
