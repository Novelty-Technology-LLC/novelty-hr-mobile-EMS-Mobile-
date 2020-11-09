import React from 'react';
import { View, Text } from 'react-native';
import { headerText, leaveDashboardStyle } from '../../../assets/styles';
import { ComingSoon, header as Header } from '../../common';
import { RequestButton } from '../../components/requestButton';
import { TimeLogs } from '../../components/time_log';

const TimeLog = () => {
  return (
    <View style={leaveDashboardStyle.mainContainer}>
      <Header>
        <Text style={headerText}>TIME LOG</Text>
      </Header>
      <View>
        {/* <Text>Time Log</Text>*/}
        <TimeLogs />
      </View>
      <RequestButton screen="logtime" />
    </View>
  );
};

export { TimeLog };
