import React, { useState } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import colors from '../../../assets/colors';
import { fonts, theme } from '../../../assets/styles';
import { DropDown } from '../../common';
import normalize from '../../utils/normalize';

const weekOptions = [
  { label: 'This week', value: 'This week', key: '1' },
  { label: 'Past week', value: 'Past week', key: '2' },
];

const Header = ({
  title,
  dropDown,
  setLogTime,
  week,
  setWeek,
}: {
  title: string;
  dropDown: boolean;
  setLogTime: Function;
  week: string;
  setWeek: any;
}) => {
  return (
    <View style={styles.main}>
      <Text style={styles.text}>{title}</Text>
      {dropDown && (
        <DropDown
          options={weekOptions}
          type="week"
          week={week}
          onChange={(filter: any, val: any) => {
            setLogTime(filter);
            setWeek(val);
          }}
          style={styles.dropDown}
          labelStyle={styles.labelStyle}
          arrowColor={colors.primary}
        />
      )}
    </View>
  );
};

export { Header };

const styles = StyleSheet.create({
  main: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dropDown: {
    borderWidth: 1,
    borderColor: colors.primary,
    backgroundColor: colors.white,
    padding: normalize(40),
    ...(Platform.OS !== 'android' && {
      zIndex: 100,
    }),
  },
  labelStyle: {
    color: colors.primary,
    fontSize: normalize(theme.size.xs),
  },
  text: {
    fontSize: normalize(theme.size.normal),
    fontFamily: fonts.PoppinsSemibold,
  },
});
