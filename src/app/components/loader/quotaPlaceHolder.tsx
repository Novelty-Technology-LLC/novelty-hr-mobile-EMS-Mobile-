import React from 'react';
import { StyleSheet, View } from 'react-native';
import normalize from 'react-native-normalize';

import { QuotaItem } from './quotaItem';

const QuotaPlaceHolder = () => {
  return (
    <View style={styles.row}>
      <QuotaItem />
      <QuotaItem />
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    paddingTop: normalize(20),
    paddingLeft: normalize(40),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export { QuotaPlaceHolder };
