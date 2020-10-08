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
    date.getDay() !== 0 &&
    date.getDay() !== 6 &&
    date.getDate() > new Date().getDate() - 1;

  useEffect(() => {
    handleChange('date')(`${JSON.stringify(range)}`);
  }, [range]);

  console.log('range -> in render', range);

  let newRange = null;
  return (
    <RangeCalendar
      filter={filter}
      range={range}
      onSelect={(nextRange) => {
        newRange = Object.assign(nextRange);
        if (
          newRange.endDate &&
          newRange.startDate &&
          newRange.endDate.getDate() - newRange.startDate.getDate() < 6 &&
          newRange.endDate.getDay() - newRange.startDate.getDay() > 0
        ) {
          setrange(newRange);
        } else if (newRange.endDate === null || newRange.startDate === null) {
          setrange(newRange);
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
