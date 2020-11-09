import React, { useState, useEffect } from 'react';
import { RangeCalendar } from '@ui-kitten/components';
import { Text } from 'react-native';
import { dateStringMapper } from '../../utils';
import { timeLogStyle } from '../../../assets/styles';
interface calenderPropType {
  style: object;
  handleChange: Function;
  defaultValue: object;
  error: any;
  touched: any;
}

const Calander = ({
  style,
  handleChange,
  defaultValue,
  error,
  touched,
}: calenderPropType) => {
  const [range, setrange] = useState(
    defaultValue
      ? {
          endDate: new Date(defaultValue.endDate),
          startDate: new Date(defaultValue.startDate),
        }
      : ''
  );

  const filter = (date) => date.getDay() !== 0 && date.getDay() !== 6;

  useEffect(() => {
    handleChange('date')(`${JSON.stringify(range)}`);
  }, [range]);

  return (
    <>
      {range.startDate && (
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
      <RangeCalendar
        filter={filter}
        range={range}
        onSelect={(nextRange) => setrange(nextRange)}
        style={style.calendar}
        name="date"
        label="date"
      />
      {error.date && touched.date && (
        <Text style={style.error}>Date is a required field</Text>
      )}
    </>
  );
};

export { Calander };
