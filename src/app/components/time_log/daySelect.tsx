import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { AppIcon } from '../../common';
import { calenderStyle as style, requestLeave } from '../../../assets/styles';
import Dialog from 'react-native-dialog';
import { Calander as MCalendar } from '../request_screen/calander';

import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';
import { default as theme } from '../../../assets/styles/leave_screen/custom-theme.json';

const DaySelect = ({ handleChange }: { handleChange: Function }) => {
  const [visible, setVisible] = useState(false);
  const [date, setDate] = useState(new Date());

  return (
    <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
      <TouchableOpacity style={style.icon} onPress={() => setVisible(true)}>
        <AppIcon name="calendar" size={20} />
      </TouchableOpacity>
      <Dialog.Container visible={visible} contentStyle={style.modalCalender}>
        <MCalendar
          style={requestLeave}
          handleChange={(data) => {
            setDate(data);
            handleChange(data);
          }}
          modal={true}
        />
        <Dialog.Button label="ok" onPress={() => setVisible(false)} />
      </Dialog.Container>
    </ApplicationProvider>
  );
};

export { DaySelect };
