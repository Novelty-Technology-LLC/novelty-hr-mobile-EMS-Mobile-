import React, { useState, useEffect, useContext } from 'react';
import { View, Text } from 'react-native';
import {
  FlatList,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import {
  myRequestsStyle,
  otherRequestsStyle,
  historyStyle,
} from '../../../assets/styles';
import colors from '../../../assets/colors';
import { Request } from './request';
import History from './history';
import { useNavigation } from '@react-navigation/native';
import { AppIcon, Loader } from '../../common';
import { getAllRequests } from '../../services';
import { getUser, mapDataToRequest } from '../../utils';
import { AdminRequestContext, AuthContext } from '../../reducer';
import { AdminPlaceHolder } from '../loader';

const OtherRequests = ({ refresh }: { refresh: number }) => {
  const navigation = useNavigation();
  const [toggle, setToggle] = useState('toggle-switch');
  const [loading, setLoading] = useState(false);
  const { state } = useContext(AuthContext);
  const { adminrequests, dispatchAdmin } = useContext(AdminRequestContext);

  const getAdminRequest = async () => {
    setLoading(true);
    const user = await getUser();

    getAllRequests(JSON.parse(user).id)
      .then((data: Array) => {
        let pastreq = data.filter(
          (item) => item.status === 'Approved' || item.status === 'Denied'
        );
        let myreq = data.filter((item) => item.status === 'Pending');
        const progressreq = data.filter(
          (item) => item.status === 'In Progress'
        );
        progressreq.map(
          (req) =>
            req.leave_approvals &&
            req.leave_approvals.map((item) => {
              if (item.requested_to === state.user.id) {
                pastreq = pastreq.concat(req);
                pastreq.sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1));
              } else {
                myreq = myreq.concat(req);
                myreq.sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1));
              }
            })
        );

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
  }, [refresh]);

  return (
    <View style={otherRequestsStyle.container}>
      <View style={otherRequestsStyle.header}>
        <Text style={myRequestsStyle.title}> Requests Received</Text>
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
        <AdminPlaceHolder />
      ) : (
        <FlatList
          extraData={adminrequests.adminrequests}
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
      {loading && (
        <>
          <View style={historyStyle.subcontainer}>
            <Text style={historyStyle.header}>Past Requests</Text>
            <View style={historyStyle.line}></View>
          </View>
          <AdminPlaceHolder />
        </>
      )}
      {toggle === 'toggle-switch' && (
        <History other={true} requests={adminrequests.pastadminrequests} />
      )}
    </View>
  );
};

export default OtherRequests;
