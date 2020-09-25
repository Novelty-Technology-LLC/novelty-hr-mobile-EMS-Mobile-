import React, { useState, useContext } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { header as Header } from '../../common/header';
import { DaysRemaining, MyRequests } from '../../components';
import { leaveDashboardStyle as style } from '../../../assets/styles';
import OtherRequests from '../../components/leave_screen/otherRequests';
import { RequestButton } from '../../components/requestButton';
import colors from '../../../assets/colors';
import { RequestContext, useRequest } from '../../reducer';
import { headerText } from '../../../assets/styles';
import { AuthContext } from '../../reducer';
import { removeToken } from '../../utils';

const LeaveDashboard = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const { requests, dispatchRequest } = useRequest();
  const { dispatch } = useContext(AuthContext);

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
            <DaysRemaining total={5} remaining={4} title="Paid Time Offs" />
            <DaysRemaining total={5} remaining={3} title="Floating Days" />
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
