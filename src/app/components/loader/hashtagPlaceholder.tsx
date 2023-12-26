import React from 'react';
import { StyleSheet, View } from 'react-native';
import normalize from 'react-native-normalize';
import { Placeholder, PlaceholderLine, Fade } from 'rn-placeholder';
import { leaveType } from '../../../assets/styles';

const HashtagPlaceHolder = () => {
  return (
    <View style={styles.container}>
      <Placeholder Animation={Fade}>
        <View style={styles.row}>
          <PlaceholderLine width={33} height={5} />
          <View style={leaveType.spacer}></View>
          <PlaceholderLine width={33} height={5} />
          <View style={leaveType.spacer}></View>
          <PlaceholderLine width={33} height={5} />
        </View>
      </Placeholder>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: normalize(20),
    flexWrap: 'wrap',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: normalize(20),
  },
});

export { HashtagPlaceHolder };
