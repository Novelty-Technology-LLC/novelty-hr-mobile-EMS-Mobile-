import React, { useState, useEffect, useContext } from 'react';
import { View, Text } from 'react-native';
import { header as Header } from '../../common/header';
import { headerText } from '../../../assets/styles';
import { approveRequest as style } from '../../../assets/styles';
import Request from '../../components/approveRequest/approve_request';
import { ApproveDeny } from '../../components';
import getName from '../../components/approveRequest/getName';
import { AuthContext } from '../../reducer';

const ApproveRequest = ({ route }: any) => {
  let { dayRange, day } = getDay(route.params);
  let { name } = getName(route.params);
  const [approved, setapproved] = useState([]);
  const [id, setid] = useState(null);
  const { state } = useContext(AuthContext);

  useEffect(() => {
    const Id = async () => {
      setid(state.user.uuid);
    };
    Id();
  }, []);
  console.log('route', route.params);

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
