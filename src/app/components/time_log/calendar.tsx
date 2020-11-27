import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import CalendarStrip from 'react-native-calendar-strip';
import colors from '../../../assets/colors';
import { calenderStyle as style } from '../../../assets/styles';
import moment from 'moment';
import { momentdate } from '../../utils/momentDate';
import { formatDate, getDateWithOutTimeZone } from '../../utils';

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
    defaultValue ? moment(defaultValue).format('l') : moment().format('l')
  );

  const onDateSelect = (date: any) => {
    const result = moment(date).format();
    setDate(result);
    const resDate = formatDate(moment(result).format('L'));
    if (other) {
      handleChange(resDate);
    } else {
      handleChange('log_date')(resDate);
    }
  };

  useEffect(() => {
    onDateSelect(date);
  }, []);

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
        numDaysInWeek={7}
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
          onDateSelect(date);
        }}
        // datesBlacklist={datesBlacklistFunc}
      />
    </View>
  );
};

export { Calendar };
