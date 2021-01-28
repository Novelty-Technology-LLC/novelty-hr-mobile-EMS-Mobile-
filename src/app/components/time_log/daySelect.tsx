import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { dayStyle } from '../../../assets/styles';
import { CalendarComponent as MCalendar } from '../request_screen/calander';
import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';
import { default as theme } from '../../../assets/styles/leave_screen/custom-theme.json';
import Day from './day';
import { getStringDate } from '../../utils';
import { DialogContainer } from '../../common';
import { todayDate, yesterdayDate } from '../../utils/dateFilter';

const DaySelect = ({
  handleChange,
  refreshing,
  setSelectedDay,
}: {
  handleChange: Function;
  refreshing: Boolean;
  setSelectedDay: Function;
}) => {
  const [visible, setVisible] = useState(false);
  const today = todayDate().start;
  const [date, setDate] = useState(today);
  const [modalDate, setModalDate] = useState(today);
  const [modalDateString, setModalDateString] = useState('');
  const yesterday = yesterdayDate().start;
  const [index, setIndex] = useState(2);
  const isSelected = (newdate) => {
    return newdate.toDateString() === new Date(date).toDateString();
  };

  useEffect(() => {
    setModalDateString(getStringDate(modalDate));
  }, [modalDate]);

  useEffect(() => {
    setDate(today);
    handleChange(today);
    setIndex(2);
    setModalDate(today);
  }, [refreshing]);

  return (
    <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
      <View style={dayStyle.buttonContainer}>
        <Day
          title={modalDateString}
          select={isSelected(new Date(modalDate)) && index === 3}
          onPress={() => {
            setDate(new Date(modalDate));
            handleChange(modalDate);
            setVisible(true);
            setIndex(3);
          }}
          modal={true}
        />
        <Day
          title="Yesterday"
          select={isSelected(yesterday) && index === 1}
          onPress={() => {
            setDate(yesterday);
            handleChange(yesterday);
            setSelectedDay('Yesterday');
            setIndex(1);
          }}
        />
        <Day
          title="Today"
          select={isSelected(today) && index === 2}
          onPress={() => {
            setDate(today);
            handleChange(today);
            setSelectedDay('Today');
            setIndex(2);
          }}
        />
      </View>
      <DialogContainer visible={visible} setVisible={setVisible}>
        <MCalendar
          handleChange={(data) => {
            setModalDate(data);
            setDate(data);
            handleChange(data);
            setIndex(3);
            setVisible(false);
            setSelectedDay(getStringDate(data));
          }}
          modal={true}
        />
      </DialogContainer>
    </ApplicationProvider>
  );
};

export { DaySelect };
