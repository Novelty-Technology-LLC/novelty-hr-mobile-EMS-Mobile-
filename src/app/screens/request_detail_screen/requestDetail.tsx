import React from 'react';
import { Text } from 'react-native';
import { header as Header } from '../../common';

import { headerText } from '../../../assets/styles';
import Request from '../../components/approveRequest/approve_request';
import { approveRequest as style } from '../../../assets/styles';

const RequestDetail = ({ route }: any) => {
  const { date } = route.params;

  return (
    <>
      <Header icon={true}>
        <Text style={headerText}>{date}</Text>
      </Header>
      <Request data={route.params} style={style} />
    </>
  );
};

export { RequestDetail };
