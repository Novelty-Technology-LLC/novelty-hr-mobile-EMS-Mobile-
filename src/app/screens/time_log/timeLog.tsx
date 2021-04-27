import React, { useEffect } from 'react';
import { View, Text, BackHandler } from 'react-native';
import { headerTxtStyle, leaveDashboardStyle } from '../../../assets/styles';
import { header as Header } from '../../common';
import { TimeLogs } from '../../components/time_log';

const TimeLog = () => {
  return (
    <View style={leaveDashboardStyle.mainContainer}>
      <Header>
        <Text style={headerTxtStyle.headerText}>Time Log</Text>
      </Header>
      <TimeLogs />
    </View>
  );
};

export { TimeLog };
