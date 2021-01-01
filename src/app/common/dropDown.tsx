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
      items={options}
      itemStyle={{
        justifyContent: 'flex-start',
      }}
      placeholder={type === 'week' ? week : group}
      controller={(instance) => setController(instance)}
      style={{
        borderWidth: 0,
        backgroundColor: colors.buttonGrey,
        paddingHorizontal: 5,
        borderTopLeftRadius: 1,
        borderTopRightRadius: 1,
        borderBottomLeftRadius: 1,
        borderBottomRightRadius: 1,
        ...(Platform.OS !== 'android' && {
          zIndex: 10,
        }),
        height: 30,
        width: type === 'week' ? 110 : 90,
      }}
      arrowColor={colors.fontGrey}
      arrowSize={16}
      labelStyle={{
        color: colors.fontGrey,
        fontSize: 14,
        fontFamily: fonts.mulishBold,
      }}
      dropDownStyle={{ backgroundColor: '#fff' }}
      onChangeItem={(item) => {
        type === 'week' ? onChangeWeek(item.value) : onChange(item.value);
      }}
    />
  );
};

export { DropDown };
