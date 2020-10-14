import React from 'react';
import { StyleSheet, View } from 'react-native';
import normalize from 'react-native-normalize';
import {
  Placeholder,
  PlaceholderMedia,
  PlaceholderLine,
  Fade,
} from 'rn-placeholder';

const AdminPlaceHolder = () => {
  return (
    <View style={styles.container}>
      <Placeholder Animation={Fade} Left={PlaceholderMedia}>
        <View style={styles.row}>
          <PlaceholderLine width={40} />
          <PlaceholderLine width={20} />
        </View>
        <PlaceholderLine width={20} />
        <PlaceholderLine width={40} />
      </Placeholder>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: normalize(20),
    paddingVertical: normalize(20),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: normalize(20),
  },
});

export { AdminPlaceHolder };
