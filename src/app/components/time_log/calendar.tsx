import React from 'react';
import { View } from 'react-native';
import CalendarStrip from 'react-native-calendar-strip';
import colors from '../../../assets/colors';
import { calenderStyle as style } from '../../../assets/styles';

const Calendar = ({ handleChange }: { handleChange: Function }) => {
  const datesBlacklistFunc = (date) => {
    return date.isoWeekday() === 6 || date.isoWeekday() === 7;
  };

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
        numDaysInWeek={5}
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
        iconContainer={{ flex: 0.1 }}
        selectedDate={new Date()}
        onDateSelected={(data) => handleChange('log_date')(data.toJSON())}
        datesBlacklist={datesBlacklistFunc}
      />
    </View>
  );
};

export { Calendar };
