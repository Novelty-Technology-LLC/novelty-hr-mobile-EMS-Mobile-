import React, { useContext, useEffect, useState } from 'react';
import { Platform } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import colors from '../../assets/colors';
import { fonts } from '../../assets/styles';
import { TimeLogContext } from '../reducer';
import { pastWeek, thisWeek } from '../utils/dateFilter';

const DropDown = ({ options, type, onChange, week, group }: any) => {
  const [controller, setController] = useState(null);
  const { timelogs } = useContext(TimeLogContext);
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
  useEffect(() => {
    controller && controller.close();
  }, [timelogs]);

  return (
    <DropDownPicker
      items={[{ label: 'sdf', value: 'sdsd' }]}
      // controller={instance => this.controller = instance}
      onChangeList={(items, callback) => {}}
      defaultValue={'ppp'}
      onChangeItem={(item) => console.log('pp')}
    />
  );
};

export { DropDown };
