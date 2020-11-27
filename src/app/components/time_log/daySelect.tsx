import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { calenderStyle as style, dayStyle } from '../../../assets/styles';
import Dialog from 'react-native-dialog';
import { Calander as MCalendar } from '../request_screen/calander';
import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';
import { default as theme } from '../../../assets/styles/leave_screen/custom-theme.json';
import Day from './day';
import { getDateWithOutTimeZone } from '../../utils';
import { momentdate } from '../../utils/momentDate';

const DaySelect = ({
  handleChange,
  refreshing,
}: {
  handleChange: Function;
  refreshing: Boolean;
}) => {
  const [visible, setVisible] = useState(false);
  const today = getDateWithOutTimeZone(new Date());
  const [date, setDate] = useState(today);
  const [modalDate, setModalDate] = useState(today);
  const yesterday = getDateWithOutTimeZone(
    new Date(new Date().setDate(new Date().getDate() - 1))
  );
  const [index, setIndex] = useState(2);
  const isSelected = (newdate) => {
    return newdate.toDateString() === new Date(date).toDateString();
  };

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
          title={momentdate(modalDate, 'lll').split(',')[0]}
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
            setIndex(1);
          }}
        />
        <Day
          title="Today"
          select={isSelected(today) && index === 2}
          onPress={() => {
            setDate(today);
            handleChange(today);
            setIndex(2);
          }}
        />
      </View>
      <Dialog.Container
        visible={visible}
        contentStyle={style.modalCalender}
        onBackdropPress={() => setVisible(false)}
      >
        <MCalendar
          handleChange={(data) => {
            setModalDate(data);
            setDate(data);
            handleChange(data);
            setIndex(3);
            setVisible(false);
          }}
          modal={true}
        />
      </Dialog.Container>
    </ApplicationProvider>
  );
};

export { DaySelect };
