import React, { useState, useEffect } from 'react';
import { RangeCalendar } from '@ui-kitten/components';
import { useFormikContext } from 'formik';

export default RangeCalendarSimpleUsageShowcase = ({ style }) => {
  const { handleChange } = useFormikContext();
  const [range, setrange] = useState({});

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
