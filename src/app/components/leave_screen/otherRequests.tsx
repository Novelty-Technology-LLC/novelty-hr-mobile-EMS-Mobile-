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
import { AppIcon, EmptyContainer, SmallHeader } from '../../common';
import { getAllRequests } from '../../services';
import { getUser, mapDataToRequest, mapObjectToRequest } from '../../utils';
import { AdminRequestContext, AuthContext } from '../../reducer';
import { AdminPlaceHolder } from '../loader';
import { getLeave } from '../../services';

const OtherRequests = ({ refresh, params = 0 }: any) => {
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
          (item) =>
            item.status === 'Approved' ||
            item.status === 'Denied' ||
            item.status === 'Cancelled'
        );
        let myreq = data.filter((item) => item.status === 'Pending');
        const progressreq = data.filter(
          (item) => item.status === 'In Progress'
        );
        progressreq.map((req) => {
          for (let i = 0; i < req.leave_approvals.length; i++) {
            if (req.leave_approvals[i].requested_to === state.user.id) {
              pastreq = pastreq.concat(req);
              pastreq.sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1));
            }
          }
          const common = pastreq.map((item) => item.id);
          if (common.includes(req.id)) return;
          myreq = myreq.concat(req);
          myreq.sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1));
        });

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
  }, [refresh, params]);

  useEffect(() => {
    const get = async () => {
      if (+params) {
        let data = await getLeave(+params);
        data = mapObjectToRequest(data[0]);
        navigation.navigate('approveLeave', data[0]);
      }
    };
    get();
  }, [params]);

  return (
    <View style={otherRequestsStyle.container}>
      <View style={otherRequestsStyle.header}>
        <Text style={myRequestsStyle.title}> Requests Received</Text>
        {adminrequests.pastadminrequests.length > 0 && (
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
        )}
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
        <EmptyContainer text="You have not received any request." />
      )}
      {loading && (
        <>
          <SmallHeader text="Past Requests" leave={true} />
          <AdminPlaceHolder />
        </>
      )}
      {toggle === 'toggle-switch' && !loading && (
        <History other={true} requests={adminrequests.pastadminrequests} />
      )}
    </View>
  );
};

export default React.memo(OtherRequests);
