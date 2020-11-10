import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { AppIcon } from '../../common';
import { calenderStyle as style, dayStyle } from '../../../assets/styles';
import Dialog from 'react-native-dialog';
import { Calander as MCalendar } from '../request_screen/calander';
import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';
import { default as theme } from '../../../assets/styles/leave_screen/custom-theme.json';
import Day from './day';

const DaySelect = ({ handleChange }: { handleChange: Function }) => {
  const [visible, setVisible] = useState(false);
  const [date, setDate] = useState(new Date());
  const [modalDate, setModalDate] = useState(new Date());
  const yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
  const [index, setIndex] = useState(2);
  const isSelected = (newdate) => {
    return newdate.toDateString() === new Date(date).toDateString();
  };

  return (
    <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
      <View style={dayStyle.buttonContainer}>
        <Day
          title="Yesterday"
          select={isSelected(yesterday) && index === 1}
          onPress={() => {
            setDate(yesterday);
            handleChange(yesterday);
            setIndex(1);
          }}
        />
        <Day
          title="Today"
          select={isSelected(new Date()) && index === 2}
          onPress={() => {
            setDate(new Date());
            handleChange(new Date());
            setIndex(2);
          }}
        />
        <Day
          title={new Date(modalDate).toDateString().substring(4, 10)}
          select={isSelected(new Date(modalDate)) && index === 3}
          onPress={() => {
            setDate(new Date(modalDate));
            handleChange(new Date(modalDate));
            setIndex(3);
          }}
        />
        <TouchableOpacity style={style.icon} onPress={() => setVisible(true)}>
          <AppIcon name="calendar" size={25} />
        </TouchableOpacity>
      </View>
      <Dialog.Container visible={visible} contentStyle={style.modalCalender}>
        <MCalendar
          handleChange={(data) => {
            setModalDate(data);
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
