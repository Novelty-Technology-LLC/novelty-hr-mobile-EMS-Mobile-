import React, { useState, useContext, useEffect } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { header as Header } from '../../common';

import { DaysRemaining, MyRequests } from '../../components';
import { leaveDashboardStyle as style } from '../../../assets/styles';
import OtherRequests from '../../components/leave_screen/otherRequests';
import { RequestButton } from '../../components/requestButton';
import colors from '../../../assets/colors';
import { RequestContext, useRequest } from '../../reducer';
import { headerText } from '../../../assets/styles';
import { AuthContext } from '../../reducer';
import { mapDataToRequest, removeToken } from '../../utils';
import { getLeaveQuota, getMyRequests } from '../../services';

const LeaveDashboard = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const { requests, dispatchRequest } = useRequest();
  const { dispatch } = useContext(AuthContext);
  const [daysDetails, setDaysDetails] = useState([]);

  const getData = () => {
    getLeaveQuota()
      .then((data) => setDaysDetails(data))
      .catch((err) => console.log('GetLeaveQuota error', err));
  };
  const getRequest = () => {
    getMyRequests(3)
      .then((data) =>
        dispatchRequest({ type: 'CHANGE', payload: mapDataToRequest(data) })
      )
      .catch((err) => console.log('GetRequests error', err));
  };
  useEffect(() => {
    getData();
    getRequest();
  }, []);

  return (
    <RequestContext.Provider value={{ requests, dispatchRequest }}>
      <View style={style.mainContainer}>
        <Header
          onPress={() => {
            removeToken();
            dispatch({ type: 'SIGN_OUT' });
          }}
        >
          <Text style={headerText}>Leave Application</Text>
        </Header>
        <ScrollView>
          <View style={style.container}>
            {daysDetails &&
              daysDetails.length > 0 &&
              daysDetails.map((daysDetail) => (
                <DaysRemaining
                  key={daysDetail.id}
                  total={daysDetail.leave_total}
                  remaining={daysDetail.leave_used}
                  title={daysDetail.leave_type}
                />
              ))}
          </View>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: colors.white,
            }}
          >
            <Text
              style={{
                color: isAdmin ? colors.primary : colors.secondary,
              }}
              onPress={() => setIsAdmin(!isAdmin)}
            >
              ADMIN
            </Text>
          </View>
          {isAdmin ? <OtherRequests /> : <MyRequests />}
        </ScrollView>
        <RequestButton />
      </View>
    </RequestContext.Provider>
  );
};

export { LeaveDashboard };
