import React, { useState, useEffect } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';

const DropDown = ({ options, type }: any) => {
  const [week, setWeek] = useState(null);
  const [group, setGroup] = useState(null);

  const onChangeWeek = (val: string) => {
    switch (val) {
      case 'This week':
        setWeek(val);
        return;
      case 'Past week':
        setWeek(val);
        return;
    }
  };

  const onChangeGroup = (val: string) => {
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
        setGroup(options[0].value);
      }
    };
    setValue();
  }, []);

  console.log('week -> ', week);
  console.log('group-> ', group);

  return (
    <DropDownPicker
      items={options}
      placeholder={type === 'week' ? week : group}
      defaultValue={type === 'week' ? week : group}
      containerStyle={{ height: 40, width: 150 }}
      dropDownStyle={{ backgroundColor: '#fff' }}
      onChangeItem={(item) => {
        type === 'week' ? onChangeWeek(item.value) : onChangeGroup(item.value);
      }}
    />
  );
};

export { DropDown };
