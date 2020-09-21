import React, { useContext } from 'react';
import { Text, View, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { header as Header } from '../../common/header';
import { DaysRemaining, MyRequests } from '../../components';
import { leaveDashboardStyle as style } from '../../../assets/styles';
import {
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../../../assets/colors';
import OtherRequests from '../../components/leave_screen/otherRequests';
import { removeToken } from '../../utils';
import { AuthContext } from '../../reducer';

const LeaveDashboard = () => {
  const navigation = useNavigation();
  const { dispatch } = useContext(AuthContext);
  return (
    <View style={style.mainContainer}>
      <Text
        onPress={() => {
          removeToken();
          dispatch({ type: 'SIGN_OUT' });
        }}
      >
        Leave
      </Text>
      <Header>Leave Application</Header>
      <ScrollView>
        <View style={style.container}>
          <DaysRemaining total={5} remaining={4} title="Paid Time Offs" />
          <DaysRemaining total={5} remaining={3} title="Floating Days" />
        </View>
        {/* <MyRequests /> */}
        <OtherRequests />
      </ScrollView>
      <View style={style.plus}>
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate('requestLeave')}
        >
          <Icon name="plus" color={colors.white} size={20} />
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

export { LeaveDashboard };
