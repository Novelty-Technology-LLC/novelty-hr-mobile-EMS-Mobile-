import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { header as Header } from '../../common/header';
import { headerText } from '../../../assets/styles';
import { approveRequest as style } from '../../../assets/styles';
import Request from '../../components/approveRequest/approve_request';
import { ApproveDeny } from '../../components';
import getName from '../../components/approveRequest/getName';
import { getUser } from '../../utils';

const ApproveRequest = ({ route }: any) => {
  let { dayRange, day } = getDay(route.params);
  let { name } = getName(route.params);
  const [approved, setapproved] = useState([]);
  const [id, setid] = useState(null);

  useEffect(() => {
    const Id = async () => {
      const data = await getUser();
      setid(JSON.parse(data).uuid);
      console.log(id);
    };
    Id();
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
      <Request data={route.params} style={style} setapproved={setapproved} />
      {approved.length < 1 ? (
        <View style={style.buttonView}>
          <ApproveDeny title="Approve" style={style} item={route.params} />
          <ApproveDeny title="Deny" style={style} item={route.params} />
        </View>
      ) : approved[0].leave_id === route.params.id &&
        approved[0].userId === id ? null : (
        <View style={style.buttonView}>
          <ApproveDeny title="Approve" style={style} item={route.params} />
          <ApproveDeny title="Deny" style={style} item={route.params} />
        </View>
      )}
    </>
  );
};

export { ApproveRequest };
