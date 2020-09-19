import React from 'react';
import { Layout, RangeCalendar } from '@ui-kitten/components';

export default RangeCalendarSimpleUsageShowcase = ({ style }) => {
  const [range, setRange] = React.useState({});

  return (
    <RangeCalendar
      range={range}
      onSelect={(nextRange) => setRange(nextRange)}
      style={style}
    />
  );
};
