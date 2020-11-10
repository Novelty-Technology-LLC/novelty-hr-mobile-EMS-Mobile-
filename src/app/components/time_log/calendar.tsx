import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import CalendarStrip from 'react-native-calendar-strip';
import colors from '../../../assets/colors';
import { calenderStyle as style, requestLeave } from '../../../assets/styles';
import { AppIcon } from '../../common';
import Dialog from 'react-native-dialog';
import { Calander as MCalendar } from '../request_screen/calander';

import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';
import { default as theme } from '../../../assets/styles/leave_screen/custom-theme.json';

const Calendar = ({
  handleChange,
  defaultValue,
  other,
}: {
  handleChange: Function;
  defaultValue?: Date;
  other?: boolean;
}) => {
  const datesBlacklistFunc = (date) => {
    return date.isoWeekday() === 6 || date.isoWeekday() === 7;
  };
  const [visible, setVisible] = useState(false);
  const [date, setDate] = useState(
    defaultValue ? new Date(defaultValue) : new Date()
  );

  return (
    <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
      <View style={style.container}>
        <TouchableOpacity style={style.icon} onPress={() => setVisible(true)}>
          <AppIcon name="calendar" size={20} />
        </TouchableOpacity>
        <CalendarStrip
          scrollable
          daySelectionAnimation={{
            type: 'border',
            duration: 200,
            borderWidth: 1,
            borderHighlightColor: 'white',
          }}
          style={style.main}
          numDaysInWeek={6}
          calendarHeaderStyle={style.header}
          calendarColor={colors.white}
          dateNumberStyle={style.number}
          dateNameStyle={{ color: colors.black }}
          highlightDateNumberStyle={style.highlight}
          highlightDateNameStyle={{
            color: colors.black,
          }}
          disabledDateNameStyle={{ color: 'grey' }}
          disabledDateNumberStyle={{ color: 'grey' }}
          iconContainer={{ display: 'none' }}
          selectedDate={date}
          onDateSelected={(date) => {
            let result = new Date(date);
            setDate(result);
            const resDate =
              result.getFullYear() +
              '-' +
              (parseInt(result.getMonth()) + 1) +
              '-' +
              `${
                result.getDate() > 9 ? result.getDate() : '0' + result.getDate()
              }`;
            if (other) {
              handleChange(resDate);
            } else {
              handleChange('log_date')(resDate);
            }
          }}
          // datesBlacklist={datesBlacklistFunc}
        />
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
      </View>
    </ApplicationProvider>
  );
};

export { Calendar };
