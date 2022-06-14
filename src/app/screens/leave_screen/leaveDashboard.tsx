<<<<<<< HEAD
<<<<<<< HEAD
import React, { useState, useContext, useEffect } from "react";
import { View, ScrollView, Text, RefreshControl, FlatList } from "react-native";
import { header as Header } from "../../common";
import { DaysRemaining, MyRequests } from "../../components";
=======
import React, { useState, useContext, useEffect } from 'react'
import { View, ScrollView, Text, RefreshControl } from 'react-native'
import { header as Header } from '../../common'
import { DaysRemaining, MyRequests } from '../../components'
>>>>>>> 20f91fa9de4a7d3896011119e125a212631f0b31
=======
import React, { useState, useContext, useEffect } from 'react';
import { View, ScrollView, Text, RefreshControl } from 'react-native';
import { header as Header } from '../../common';
import { DaysRemaining, MyRequests } from '../../components';
>>>>>>> 6cca8aad86875385f183aab23c5f8da705c430cf
import {
  headerTxtStyle,
  leaveDashboardStyle as style,
} from '../../../assets/styles';
import OtherRequests from '../../components/leave_screen/otherRequests';
import { RequestButton } from '../../components/requestButton';
import { RequestContext } from '../../reducer';
import { getUser, mapDataToRequest, setUser } from '../../utils';
import { get, getLeaveQuota, getMyRequests, store } from '../../services';
import { QuotaPlaceHolder } from '../../components/loader/quotaPlaceHolder';
import { useScrollToTop } from '@react-navigation/native';
import { AuthContext } from '../../reducer';
import Autolink from 'react-native-autolink';

const LeaveDashboard = () => {
  const [refreshing, setRefreshing] = React.useState(false);
  const [refresh, setRefresh] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const ref = React.useRef(null);
  const {
    state: { notifdata },
  } = useContext(AuthContext);

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
      getData();
      getRequest();
    };

    runFunction();
  }, []);

  useScrollToTop(ref);
  return (
    <View style={style.mainContainer}>
      <Header icon={false}>
        <Text style={headerTxtStyle.headerText}>Leave Application</Text>
      </Header>
      <ScrollView
        style={{ flexGrow: 1 }}
        nestedScrollEnabled={true}
        showsVerticalScrollIndicator={false}
        ref={ref}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
<<<<<<< HEAD
        {Object.keys(requests.quota).length > 0 ? null : <QuotaPlaceHolder />}
=======
        {requests?.quota?.length > 0 ? null : <QuotaPlaceHolder />}
>>>>>>> 6cca8aad86875385f183aab23c5f8da705c430cf
        <View style={style.container}>
          {requests.quota &&
            requests.quota.length > 0 &&
            requests.quota.map((daysDetail) => (
              <DaysRemaining
                key={daysDetail?.id}
                total={daysDetail?.leave_total}
                remaining={daysDetail?.leave_used}
                title={daysDetail?.leave_type}
              />
            ))}
        </View>

              return (
                <DaysRemaining
                  key={daysDetail.id}
                  total={daysDetail.leave_total}
                  remaining={daysDetail.leave_used}
                  title={daysDetail.leave_type}
                />
              );
            })}
      
        <MyRequests
          loading={loading}
          refresh={refresh}
          params={notifdata?.request === 'myrequest' && +notifdata?.leave_id}
        />
        {isAdmin && (
          <OtherRequests
            refresh={refresh}
            params={
              notifdata?.request === 'otherrequest' && +notifdata?.leave_id
            }
          />
        )}
      </ScrollView>
      <RequestButton screen='requestLeave' />
    </View>
  );
};

export { LeaveDashboard };
