import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import { headerText, leaveDashboardStyle } from '../../../assets/styles';
import { ComingSoon, header as Header } from '../../common';
import { DaysRemaining } from '../../components';
import { RequestButton } from '../../components/requestButton';
import { TimeLogs } from '../../components/time_log';
import { TimeLogContext } from '../../reducer';
import { totalWeekHours } from '../../utils';

const TimeLog = () => {
  const { timelogs, dispatchTimeLog } = useContext(TimeLogContext);
  console.log('tt', totalWeekHours(timelogs.past) / 60);

  return (
    <View style={leaveDashboardStyle.mainContainer}>
      <Header>
        <Text style={headerText}>TIME LOG</Text>
      </Header>
      <View style={{ flexDirection: 'row' }}>
        <DaysRemaining
          total={40}
          remaining={totalWeekHours(timelogs.present) / 60}
          title={'This Week'}
          timelog={true}
        />
        <DaysRemaining
          total={40}
          remaining={totalWeekHours(timelogs.past) / 60}
          title={'Past Week'}
          timelog={true}
        />
      </View>
      <TimeLogs />
      <RequestButton screen="logtime" />
    </View>
  );
};

export { TimeLog };
