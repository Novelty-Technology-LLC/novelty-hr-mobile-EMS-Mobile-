import React, { useEffect } from 'react';
import { View, Text, BackHandler } from 'react-native';
import { headerText, leaveDashboardStyle } from '../../../assets/styles';
import { header as Header } from '../../common';
import { TimeLogs } from '../../components/time_log';
import { getCurrentRouteName } from '../../utils/navigation';

const TimeLog = () => {
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      if (getCurrentRouteName() === 'timelog') {
        BackHandler.exitApp();
      }
    });
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', BackHandler.exitApp);
    };
  }, []);

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
