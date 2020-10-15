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

const filter = (date) => date > new Date();

  useEffect(() => {
    handleChange('date')(`${JSON.stringify(range)}`);
  }, [range]);

  return (
    <RangeCalendar
      filter={filter}
      range={range}
      onSelect={(nextRange) => setrange(nextRange)}
      style={style}
      name="date"
    />
  );
};

export { Calander };
