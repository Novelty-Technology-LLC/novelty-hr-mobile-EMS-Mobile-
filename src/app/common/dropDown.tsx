import React, { useContext, useEffect, useRef, useState } from 'react';
import { Platform, StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import colors from '../../assets/colors';
import { fonts } from '../../assets/styles';
import { TimeLogContext } from '../reducer';
import { pastWeek, thisWeek } from '../utils/dateFilter';

const DropDown = ({
  options,
  type,
  onChange,
  week,
  group,
  style,
  labelStyle,
  containerStyle,
  arrowColor = colors.fontGrey,
}: any) => {
  const controller = useRef(null);
  // const { timelogs } = useContext(TimeLogContext);
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
    controller && controller.current.close();
  }, []);

  return (
    <DropDownPicker
      items={options}
      itemStyle={{
        justifyContent: 'flex-start',
      }}
      containerStyle={containerStyle}
      placeholder={type === 'week' ? week : group}
      controller={(instance) => (controller.current = instance)}
      style={[styles.default, style, { width: type === 'week' ? 110 : 90 }]}
      showArrow={true}
      arrowColor={arrowColor}
      arrowSize={16}
      labelStyle={[styles.labelStyle, labelStyle]}
      dropDownStyle={{ backgroundColor: '#fff' }}
      onChangeItem={(item) => {
        type === 'week' ? onChangeWeek(item.value) : onChange(item.value);
      }}
    />
  );
};

export { DropDown };

const styles = StyleSheet.create({
  default: {
    borderRadius: 8,
    borderWidth: 0,
    paddingVertical: -1,
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
  },
  labelStyle: {
    color: colors.fontGrey,
    fontSize: 14,
    fontFamily: fonts.mulishBold,
  },
});
