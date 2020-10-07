import React, { useState, useEffect, useContext } from 'react';
import { View, Text } from 'react-native';
import {
  FlatList,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import { myRequestsStyle, otherRequestsStyle } from '../../../assets/styles';
import colors from '../../../assets/colors';
import { Request } from './request';
import History from './history';
import { useNavigation } from '@react-navigation/native';
import { AppIcon, Loader } from '../../common';
import { getAllRequests } from '../../services';
import { getUser, mapDataToRequest } from '../../utils';
import { AdminRequestContext, AuthContext } from '../../reducer';

const OtherRequests = () => {
  const navigation = useNavigation();
  const [toggle, setToggle] = useState('toggle-switch');
  const [loading, setLoading] = useState(false);
  const { state } = useContext(AuthContext);
  const { adminrequests, dispatchAdmin } = useContext(AdminRequestContext);

  const getAdminRequest = async () => {
    setLoading(true);
    const user = await getUser();
    console.log('user -> ', user);

    getAllRequests(JSON.parse(user).uuid)
      .then((data: Array) => {
        console.log('data -> in promise', data);

        let pastreq = data.filter(
          (item) => item.status === 'Approved' || item.status === 'Denied'
        );
        const myreq = data.filter((item) => item.status === 'Pending');
        const progressreq = data.filter(
          (item) => item.status === 'In Progress'
        );

        progressreq.map(
          (req) =>
            req.leave_approvals &&
            req.leave_approvals.map((item) => {
              if (item.requested_to === state.user.uuid) {
                pastreq = pastreq.concat(req);
              } else {
                myreq = myreq.concat(req);
              }
            })
        );
        console.log('data', myreq, pastreq, progressreq);

        dispatchAdmin({
          type: 'CHANGE',
          payload: {
            my: mapDataToRequest(myreq),
            past: mapDataToRequest(pastreq),
          },
        });
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };
  useEffect(() => {
    getAdminRequest();
  }, []);

  return (
    <View style={otherRequestsStyle.container}>
      <View style={otherRequestsStyle.header}>
        <Text style={myRequestsStyle.title}> Requests Recieved</Text>
        <View style={myRequestsStyle.row}>
          <Text style={myRequestsStyle.history}> History</Text>
          <View style={myRequestsStyle.gap}></View>
          <TouchableWithoutFeedback
            onPress={() =>
              setToggle(
                toggle === 'toggle-switch'
                  ? 'toggle-switch-off'
                  : 'toggle-switch'
              )
            }
          >
            <AppIcon
              name={toggle}
              color={
                toggle === 'toggle-switch' ? colors.primary : colors.secondary
              }
              size={40}
            />
          </TouchableWithoutFeedback>
        </View>
      </View>
      {loading ? (
        <Loader color="black" size={20} />
      ) : (
        <FlatList
          data={adminrequests.adminrequests}
          renderItem={(item) => (
            <Request
              item={item.item}
              other={true}
              recieved={true}
              onPress={() => navigation.navigate('approveLeave', item.item)}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      )}
      {adminrequests.adminrequests.length < 1 && !loading && (
        <View style={myRequestsStyle.emptyContainer}>
          <Text style={myRequestsStyle.emptyText}>
            There are no current requests
          </Text>
        </View>
      )}
      {toggle === 'toggle-switch' &&
        adminrequests.pastadminrequests.length > 0 && (
          <History other={true} requests={adminrequests.pastadminrequests} />
        )}
    </View>
  );
};

export default OtherRequests;
