import React, { useContext, useEffect, useRef, useState } from 'react';
import { Platform, StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import colors from '../../assets/colors';
import { fonts, theme } from '../../assets/styles';
import { TimeLogContext } from '../reducer';
import { pastWeek, thisWeek } from '../utils/dateFilter';
import normalize from '../utils/normalize';

const DropDown = ({
  options,
  type,
  onChange,
  week,
  group,
  style,
  labelStyle,
  arrowColor = colors.primary,
}: any) => {
  const controller = useRef(null);
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
    controller && controller.current.close();
  }, [timelogs]);

  return (
    <DropDownPicker
      items={options}
      itemStyle={{
        justifyContent: 'flex-start',
        marginTop: normalize(-6),
        marginBottom: normalize(-4),
      }}
      placeholder={type === 'week' ? week : group}
      controller={(instance) => (controller.current = instance)}
      style={[
        styles.default,
        style,
        { width: type === 'week' ? 110 : 90, borderColor: colors.primary },
      ]}
      showArrow={true}
      arrowColor={arrowColor}
      arrowSize={normalize(16)}
      labelStyle={[styles.labelStyle, labelStyle]}
      dropDownStyle={{
        backgroundColor: '#fff',
        zIndex: 100,

        borderColor: arrowColor,
      }}
      onChangeItem={(item) => {
        type === 'week' ? onChangeWeek(item.value) : onChange(item.value);
      }}
    />
  );
};

export { DropDown };

const styles = StyleSheet.create({
  default: {
    borderRadius: normalize(5),
    borderWidth: 0,
    paddingVertical: normalize(-1),
    borderColor: colors.primary,
    backgroundColor: colors.buttonGrey,
    paddingHorizontal: normalize(5),
    ...(Platform.OS !== 'android' && {
      zIndex: 100,
    }),
    height: normalize(30),
  },
  labelStyle: {
    color: colors.primary,
    fontSize: normalize(theme.size.xs),
    fontFamily: fonts.mulishBold,
  },
});
