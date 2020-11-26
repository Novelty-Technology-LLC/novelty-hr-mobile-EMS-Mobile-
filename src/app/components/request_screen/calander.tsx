import React, { useState, useEffect } from 'react';
import { RangeCalendar, Calendar } from '@ui-kitten/components';
import { Text } from 'react-native';
import moment from 'moment';
import { MomentDateService } from '@ui-kitten/moment';
import { dateStringMapper } from '../../utils';
import { timeLogStyle } from '../../../assets/styles';
import { momentdate } from '../../utils/momentDate';
interface calenderPropType {
  style?: object;
  handleChange: Function;
  defaultValue?: object;
  error?: any;
  touched?: any;
  modal?: boolean;
}

const Calander = ({
  style,
  handleChange,
  defaultValue,
  error,
  touched,
  modal,
}: calenderPropType) => {
  const [range, setrange] = useState(
    defaultValue
      ? {
          endDate: new Date(defaultValue.endDate),
          startDate: new Date(defaultValue.startDate),
        }
      : ''
  );
  const [date, setDate] = useState(moment());
  const dateService = new MomentDateService();

  const filter = (date) => date.getDay() !== 0 && date.getDay() !== 6;
  const modalfilter = (date) => momentdate(date) < momentdate();

  useEffect(() => {
    if (!modal) {
      handleChange('date')(`${JSON.stringify(range)}`);
    }
  }, [range]);

  return (
    <>
      {range.startDate && !modal && (
        <Text style={timeLogStyle.rldate}>
          Total :{' '}
          {dateStringMapper(
            new Date(range.startDate).toString().substring(0, 15),
            range.endDate
              ? new Date(range.endDate).toString().substring(0, 15)
              : new Date(range.startDate).toString().substring(0, 15)
          )}
        </Text>
      )}
      {modal ? (
        <Calendar
          style={timeLogStyle.modalCalender}
          // filter={modalfilter}
          dateService={dateService}
          date={date}
          onSelect={(nextRange) => {
            setDate(nextRange);
            handleChange(nextRange);
          }}
          name="date"
          label="date"
        />
      ) : (
        <RangeCalendar
          max={new Date(2021, 11)}
          filter={filter}
          range={range}
          onSelect={(nextRange) => setrange(nextRange)}
          style={style.calendar}
          name="date"
          label="date"
        />
      )}
      {error && error.date && touched.date && (
        <Text style={style.error}>Date is required</Text>
      )}
    </>
  );
};

export { Calander };
