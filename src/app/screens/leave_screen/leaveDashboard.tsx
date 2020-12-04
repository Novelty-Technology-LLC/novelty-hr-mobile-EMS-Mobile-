import React, { useState, useContext, useEffect } from 'react';
import {
  View,
  ScrollView,
  Text,
  RefreshControl,
  Linking,
  BackHandler,
  Platform,
} from 'react-native';
import { header as Header } from '../../common';
import { DaysRemaining, MyRequests } from '../../components';
import { leaveDashboardStyle as style } from '../../../assets/styles';
import OtherRequests from '../../components/leave_screen/otherRequests';
import { RequestButton } from '../../components/requestButton';
import { headerText } from '../../../assets/styles';
import { RequestContext } from '../../reducer';
import {
  getUser,
  mapDataToRequest,
  removeToken,
  removeUser,
  setUser,
  storeToken,
} from '../../utils';
import { get, getLeaveQuota, getMyRequests, store } from '../../services';
import { QuotaPlaceHolder } from '../../components/loader/quotaPlaceHolder';
import messaging from '@react-native-firebase/messaging';
import { getCurrentRouteName } from '../../utils/navigation';
import { useScrollToTop } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import DeviceInfo from 'react-native-device-info';

const LeaveDashboard = ({ route }) => {
  const [refreshing, setRefreshing] = React.useState(false);
  const [refresh, setRefresh] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const ref = React.useRef(null);
  const navigation = useNavigation();

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
        if (remoteMessage && remoteMessage.data.type === 'screen') {
          navigation.navigate('leaveList', {
            id: remoteMessage.data.leave_id,
            request: remoteMessage.data.request,
          });
        } else {
          remoteMessage && navigation.navigate('Activity');
        }
      });
    };
    runFunction();
  }, []);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      if (getCurrentRouteName() === 'leaveList') {
        BackHandler.exitApp();
      }
    });
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', BackHandler.exitApp);
    };
  }, []);

  useEffect(() => {
    const initialNotification = () => {
      messaging()
        .getInitialNotification()
        .then((remoteMessage) => {
          if (remoteMessage && remoteMessage.data.type === 'screen') {
            navigation.navigate('leaveList', {
              id: remoteMessage.data.leave_id,
              request: remoteMessage.data.request,
            });
          } else {
            remoteMessage && navigation.navigate('Activity');
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
    user = JSON.parse(user);
    const device_id = DeviceInfo.getUniqueId();

    const isValid = user.device_tokens?.some(
      (item) =>
        item.user_id === user.id &&
        item.device_id === device_id &&
        item.notification_token === token
    );

    const data = {
      id: user.id,
      notification_token: token,
      device_id,
    };

    if (!isValid) {
      store(data).then(async (data) => {
        await removeUser(),
          await removeToken(),
          await setUser(data),
          await storeToken(JSON.stringify(data));
      });
    }
  }

  useScrollToTop(ref);

  return (
    <View style={style.mainContainer}>
      <Header icon={false}>
        <Text style={headerText}>Leave Application</Text>
      </Header>
      <ScrollView
        showsVerticalScrollIndicator={false}
        ref={ref}
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
        <MyRequests
          loading={loading}
          refresh={refresh}
          params={route.params?.request === 'myrequest' && +route.params?.id}
        />
        {isAdmin && (
          <OtherRequests
            refresh={refresh}
            params={
              route.params?.request === 'otherrequest' && +route.params?.id
            }
          />
        )}
      </ScrollView>
      <RequestButton screen="requestLeave" />
    </View>
  );
};

export { LeaveDashboard };
