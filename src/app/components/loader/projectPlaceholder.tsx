import React from 'react';
import { StyleSheet, View } from 'react-native';
import normalize from 'react-native-normalize';
import { Placeholder, PlaceholderLine, Fade } from 'rn-placeholder';
import { leaveType } from '../../../assets/styles';

const ProjectPlaceHolder = () => {
  return (
    <View style={styles.container}>
      <Placeholder Animation={Fade}>
        <View style={styles.row}>
          <PlaceholderLine width={33} height={35} />
          <View style={leaveType.spacer}></View>
          <PlaceholderLine width={33} height={35} />
          <View style={leaveType.spacer}></View>
          <PlaceholderLine width={33} height={35} />
        </View>
      </Placeholder>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: normalize(0),
    flexWrap: 'wrap',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: normalize(20),
  },
});

export { ProjectPlaceHolder };
