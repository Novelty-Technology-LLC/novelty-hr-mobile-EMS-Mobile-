import React, { useState, useEffect } from 'react';
import { RangeCalendar } from '@ui-kitten/components';

const Calander = ({ style, handleChange }) => {
  const [range, setrange] = useState('');

  useEffect(() => {
    handleChange('date')(`${JSON.stringify(range)}`);
  }, [range]);

  return (
    <RangeCalendar
      range={range}
      onSelect={(nextRange) => {
        setrange(nextRange);
      }}
      style={style}
      name="date"
    />
  );
};

export { Calander };
