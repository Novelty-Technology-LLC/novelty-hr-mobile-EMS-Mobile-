import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../../../assets/colors';
import { DropDown } from '../../common';
import normalize from '../../utils/normalize';

const weekOptions = [
  { label: 'This week', value: 'This week', key: '1' },
  { label: 'Past week', value: 'Past week', key: '2' },
];

const Header = ({ title, dropDown }: { title: string; dropDown: boolean }) => {
  const [week, setWeek] = useState('This Week');
  return (
    <View style={styles.main}>
      <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{title}</Text>
      {dropDown && (
        <DropDown
          options={weekOptions}
          type="week"
          week={week}
          onChange={async (filter: any, val: any) => {}}
          style={styles.dropDown}
          labelStyle={styles.labelStyle}
          containerStyle={styles.containerStyle}
          arrowColor={colors.primary}
        />
      )}
    </View>
  );
};

export { Header };

const styles = StyleSheet.create({
  containerStyle: {
    height: normalize(30),
    borderWidth: 1,
    borderRadius: normalize(8),
    borderColor: colors.primary,
    overflow: 'hidden',
  },
  main: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dropDown: {
    backgroundColor: colors.white,
    padding: normalize(40),
    borderColor: colors.primary,
  },
  labelStyle: {
    color: colors.primary,
  },
});
