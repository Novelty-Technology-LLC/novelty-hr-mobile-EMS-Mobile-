import React from 'react';
import { header as Header } from '../../common/header';
import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';
import { default as theme } from '../../../assets/styles/leave_screen/custom-theme.json';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import { requestLeave as style } from '../../../assets/styles';

import Calander from '../../components/request_screen/calander';
import Teams from '../../components/request_screen/teams';

const RequestLeave = () => {
  return (
    <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
      <SafeAreaView style={style.container}>
        <ScrollView style={style.container}>
          <Header>Request Leave </Header>
          <Calander style={style.calendar} />
          <Teams />
        </ScrollView>
      </SafeAreaView>
    </ApplicationProvider>
  );
};

export { RequestLeave };
