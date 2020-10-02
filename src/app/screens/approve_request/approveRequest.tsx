import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { header as Header } from '../../common/header';
import { headerText } from '../../../assets/styles';
import { approveRequest as style } from '../../../assets/styles';
import { getResponses } from '../../services';
import Request from '../../components/approveRequest/approve_request';
import { ApproveDeny } from '../../components';
import getName from '../../components/approveRequest/getName';

const ApproveRequest = ({ route }: any) => {
  const [responses, setresponses] = useState([]);

  let { dayRange, day } = getDay(route.params);
  let { name } = getName(route.params);

  useEffect(() => {
    const getRequest = async () => {
      const data = await getResponses(route.params.id);
      setresponses(data);
    };
    getRequest();
  }, []);

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
      <Request data={route.params} responses={responses} style={style} />
      <View style={style.buttonView}>
        <ApproveDeny title="Approve" style={style} item={route.params} />
        <ApproveDeny title="Deny" style={style} item={route.params} />
      </View>
    </>
  );
};

export { ApproveRequest };
