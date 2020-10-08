import React, { useState, useEffect } from 'react';
import { RangeCalendar } from '@ui-kitten/components';

interface calenderPropType {
  style: object;
  handleChange: Function;
  defaultValue: object;
}

const Calander = ({ style, handleChange, defaultValue }: calenderPropType) => {
  const [range, setrange] = useState(
    defaultValue
      ? {
          endDate: new Date(defaultValue.endDate),
          startDate: new Date(defaultValue.startDate),
        }
      : ''
  );
  const filter = (date) =>
    date.getDay() !== 0 && date.getDay() !== 6 && new Date(date) > new Date();

  useEffect(() => {
    handleChange('date')(`${JSON.stringify(range)}`);
  }, [range]);
  let newRange = null;

  return (
    <RangeCalendar
      filter={filter}
      range={range}
      onSelect={(nextRange) => {
        newRange = Object.assign(nextRange);
        if (
          nextRange.endDate &&
          nextRange.startDate &&
          nextRange.endDate.getDate() - nextRange.startDate.getDate() < 6 &&
          nextRange.endDate.getDay() - nextRange.startDate.getDay() > 0
        ) {
          setrange(nextRange);
        } else if (nextRange.endDate === null || nextRange.startDate === null) {
          setrange(nextRange);
        } else {
          newRange.endDate = newRange.startDate = new Date();
          setrange(newRange);
        }
      }}
      style={style}
      name="date"
    />
  );
};

export { Calander };
