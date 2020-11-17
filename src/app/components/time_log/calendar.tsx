import React, { useState } from 'react';
import { View } from 'react-native';
import CalendarStrip from 'react-native-calendar-strip';
import colors from '../../../assets/colors';
import { calenderStyle as style } from '../../../assets/styles';
import { getDateWithOutTimeZone } from '../../utils';

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
    return new Date(date) > new Date();
  };
  const [date, setDate] = useState(
    defaultValue ? new Date(defaultValue) : new Date()
  );

  return (
    <View style={style.container}>
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
          let result = getDateWithOutTimeZone(new Date(date));
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
        datesBlacklist={datesBlacklistFunc}
      />
    </View>
  );
};

export { Calendar };
