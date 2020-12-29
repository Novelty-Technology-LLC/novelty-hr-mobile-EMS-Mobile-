import React from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { pastWeek, thisWeek } from '../utils/dateFilter';

const DropDown = ({ options, type, onChange, week, group }: any) => {
  const onChangeWeek = (val: string) => {
    switch (val) {
      case 'This week':
        onChange(thisWeek(), val);
        return;
      case 'Past week':
        onChange(pastWeek(), val);
        return;
    }
  };

  const onChangeGroup = (val: string) => {
    onChange(val);
  };

  return (
    <DropDownPicker
      items={options}
      itemStyle={{
        justifyContent: 'flex-start',
      }}
      placeholder={type === 'week' ? week : group}
      // defaultValue={type === 'week' ? week : group}
      containerStyle={{
        height: 30,
        width: type === 'week' ? 110 : 90,
      }}
      dropDownStyle={{ backgroundColor: '#fff' }}
      onChangeItem={(item) => {
        type === 'week' ? onChangeWeek(item.value) : onChangeGroup(item.value);
      }}
    />
  );
};

export { DropDown };
