import React, { useState, useContext, useEffect } from 'react';
import { View, ScrollView, Text, RefreshControl, Linking } from 'react-native';
import { header as Header } from '../../common';
import { DaysRemaining, MyRequests } from '../../components';
import {
  headerStyle,
  leaveDashboardStyle as style,
} from '../../../assets/styles';
import OtherRequests from '../../components/leave_screen/otherRequests';
import { RequestButton } from '../../components/requestButton';
import { headerText } from '../../../assets/styles';
import { RequestContext } from '../../reducer';
import { getUser, mapDataToRequest, setUser } from '../../utils';
import { get, getLeaveQuota, getMyRequests, store } from '../../services';
import { QuotaPlaceHolder } from '../../components/loader/quotaPlaceHolder';
import messaging from '@react-native-firebase/messaging';

const LeaveDashboard = ({ route }) => {
  const [refreshing, setRefreshing] = React.useState(false);
  const [refresh, setRefresh] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const onRefresh = React.useCallback(async () => {
    setRefresh((prevState) => !prevState);
    setRefreshing(true);
    const user = await getUser();
    const newuser = await get(+JSON.parse(user).id);
    setIsAdmin(+newuser.is_approver === 1 ? true : false);
    setUser(newuser);
    getLeaveQuota(JSON.parse(user).id).then((data) => {
      dispatchRequest({ type: 'QUOTA', payload: data });
      setRefreshing(false);
    });

    getMyRequests(JSON.parse(user).id)
      .then((data) => {
        dispatchRequest({ type: 'CHANGE', payload: mapDataToRequest(data) });
        setLoading(false);
        setRefreshing(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  }, []);

  const [loading, setLoading] = useState(false);
  const { requests, dispatchRequest } = useContext(RequestContext);

  const getData = async () => {
    const user = await getUser();
    getLeaveQuota(JSON.parse(user).id)
      .then((data) => {
        dispatchRequest({ type: 'QUOTA', payload: data });
      })
      .catch((err) => console.log('GetLeaveQuota error', err));
  };

  const getRequest = async () => {
    setLoading(true);
    const user = await getUser();
    setIsAdmin(+JSON.parse(user).is_approver ? true : false);

    getMyRequests(JSON.parse(user).id)
      .then((data) => {
        dispatchRequest({ type: 'CHANGE', payload: mapDataToRequest(data) });
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  useEffect(() => {
    const runFunction = () => {
      requestUserPermission();
      getData();
      getRequest();

      messaging().onNotificationOpenedApp((remoteMessage) => {
        if (remoteMessage) {
          Linking.openURL(
            `noveltyhrmobile://leaveList/${JSON.parse(
              remoteMessage.data.leave_id
            )}`
          );
        }
      });
    };
    runFunction();
  }, []);

  useEffect(() => {
    const initialNotification = () => {
      messaging()
        .getInitialNotification()
        .then((remoteMessage) => {
          if (remoteMessage) {
            Linking.openURL(
              `noveltyhrmobile://leaveList/${JSON.parse(
                remoteMessage.data.leave_id
              )}`
            );
          }
        });
    };
    initialNotification();
  }, []);

  async function requestUserPermission() {
    const token = await messaging().getToken();

    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    let user = await getUser();
    let notifcation_token = JSON.parse(user).notification_token;

    user = JSON.parse(user).uuid;

    const data = {
      uuid: user,
      notification_token: token,
    };

    if (enabled && notifcation_token !== token) {
      store(data);
    }
  }

  return (
    <View style={style.mainContainer}>
      <Header icon={false}>
        <Text style={headerText}>Leave Application</Text>
      </Header>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {requests.quota.length > 0 ? null : <QuotaPlaceHolder />}
        <View style={style.container}>
          {requests.quota &&
            requests.quota.length > 0 &&
            requests.quota.map((daysDetail) => (
              <DaysRemaining
                key={daysDetail.id}
                total={daysDetail.leave_total}
                remaining={daysDetail.leave_used}
                title={daysDetail.leave_type}
              />
            ))}
        </View>
        <MyRequests loading={loading} refresh={refresh} />
        {isAdmin && (
          <OtherRequests refresh={refresh} params={route.params?.screen} />
        )}
      </ScrollView>
      <RequestButton screen="requestLeave" />
      {/* <Text onPress={() => SetLocalNotification()}>Notfy</Text> */}
    </View>
  );
};

export { LeaveDashboard };
