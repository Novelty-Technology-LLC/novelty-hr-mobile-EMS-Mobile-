import React from 'react';
import { View, Text } from 'react-native';
import { headerText, leaveDashboardStyle } from '../../../assets/styles';
import { header as Header } from '../../common';
import { TimeLogs } from '../../components/time_log';

const TimeLog = () => {
  return (
    <View style={leaveDashboardStyle.mainContainer}>
      <Header>
        <Text style={headerText}>Time Log</Text>
      </Header>
      <TimeLogs />
    </View>
  );
};

export { TimeLog };
