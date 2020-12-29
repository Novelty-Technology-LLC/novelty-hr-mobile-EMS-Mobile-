import React, { useState, useEffect } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { pastWeek, thisWeek } from '../utils/dateFilter';

const DropDown = ({ options, type, onChange }: any) => {
  const [week, setWeek] = useState(null);
  const [group, setGroup] = useState(null);

  const onChangeWeek = (val: string) => {
    switch (val) {
      case 'This week':
        setWeek(val);
        onChange(thisWeek(), group);
        return;
      case 'Past week':
        setWeek(val);
        onChange(pastWeek(), group);
        return;
    }
  };

  const onChangeGroup = (val: string) => {
    onChange(val);
    switch (val) {
      case 'Date':
        setGroup(val);
        return;
      case 'Project':
        setGroup(val);
        return;
    }
  };

  useEffect(() => {
    const setValue = () => {
      if (type === 'week') {
        setWeek(options[0].value);
      } else {
        setGroup(options[1].value);
      }
    };
    setValue();
  }, []);

  return (
    <DropDownPicker
      items={options}
      placeholder={type === 'week' ? week : group}
      defaultValue={type === 'week' ? week : group}
      containerStyle={{ height: 40, width: type === 'week' ? 150 : 100 }}
      dropDownStyle={{ backgroundColor: '#fff' }}
      onChangeItem={(item) => {
        type === 'week' ? onChangeWeek(item.value) : onChangeGroup(item.value);
      }}
    />
  );
};

export { DropDown };
