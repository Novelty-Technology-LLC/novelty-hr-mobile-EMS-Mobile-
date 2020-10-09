import React, { useState, useContext, useEffect } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { header as Header, Loader } from '../../common';
import { DaysRemaining, MyRequests } from '../../components';
import { leaveDashboardStyle as style } from '../../../assets/styles';
import OtherRequests from '../../components/leave_screen/otherRequests';
import { RequestButton } from '../../components/requestButton';
import { headerText } from '../../../assets/styles';
import { RequestContext } from '../../reducer';
import { getUser, mapDataToRequest } from '../../utils';
import { getLeaveQuota, getMyRequests } from '../../services';

const LeaveDashboard = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  const [loading, setLoading] = useState(false);
  const { dispatchRequest } = useContext(RequestContext);
  const [daysDetails, setDaysDetails] = useState([]);

  const getData = async () => {
    const user = await getUser();
    getLeaveQuota(JSON.parse(user).uuid)
      .then((data) => {
        setDaysDetails(data);
      })
      .catch((err) => console.log('GetLeaveQuota error', err));
  };

  const getRequest = async () => {
    setLoading(true);
    const user = await getUser();

    setIsAdmin(JSON.parse(user).is_approver ? true : false);
    getMyRequests(JSON.parse(user).uuid)
      .then((data) => {
        dispatchRequest({ type: 'CHANGE', payload: mapDataToRequest(data) });
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getData();
    getRequest();
  }, []);

  return (
    <View style={style.mainContainer}>
      <Header icon={false}>
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
