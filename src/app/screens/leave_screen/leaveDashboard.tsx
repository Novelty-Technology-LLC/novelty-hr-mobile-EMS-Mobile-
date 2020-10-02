import React, { useState, useContext, useEffect } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { header as Header, Loader } from '../../common';
import { DaysRemaining, MyRequests } from '../../components';
import { leaveDashboardStyle as style } from '../../../assets/styles';
import OtherRequests from '../../components/leave_screen/otherRequests';
import { RequestButton } from '../../components/requestButton';
import colors from '../../../assets/colors';
import { headerText } from '../../../assets/styles';
import { AuthContext, RequestContext } from '../../reducer';
import {
  getId,
  getIsApprover,
  mapDataToRequest,
  removeToken,
} from '../../utils';
import { getLeaveQuota, getMyRequests } from '../../services';

const LeaveDashboard = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  const { dispatch } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const { dispatchRequest } = useContext(RequestContext);
  const [daysDetails, setDaysDetails] = useState([]);

  const getData = () => {
    getLeaveQuota()
      .then((data) => setDaysDetails(data))
      .catch((err) => console.log('GetLeaveQuota error', err));
  };

  const getRequest = async () => {
    setLoading(true);
    const userid = await getId();
    getMyRequests(userid)
      .then((data) => {
        dispatchRequest({ type: 'CHANGE', payload: mapDataToRequest(data) });
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log('GetRequests error', err);
      });
  };
  const getisadmin = async () => {
    const isapprover = await getIsApprover();
    isapprover ? setIsAdmin(true) : setIsAdmin(false);
  };

  useEffect(() => {
    getData();
    getRequest();
    getisadmin();
  }, []);

  return (
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
        {daysDetails.length > 0 ? null : <Loader color="black" size={20} />}
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
        {/* <View
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
        </View> */}
        {isAdmin ? <OtherRequests /> : <MyRequests loading={loading} />}
      </ScrollView>
      <RequestButton />
    </View>
  );
};

export { LeaveDashboard };
