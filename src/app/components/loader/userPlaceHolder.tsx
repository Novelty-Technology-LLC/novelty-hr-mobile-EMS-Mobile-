import React from 'react';
import { StyleSheet, View } from 'react-native';
import normalize from 'react-native-normalize';
import { Placeholder, PlaceholderLine, Fade } from 'rn-placeholder';

const UserPlaceHolder = () => {
  return (
    <View style={styles.container}>
      <Placeholder Animation={Fade}>
        <View style={styles.row}>
          <PlaceholderLine width={40} />
          <PlaceholderLine width={20} />
        </View>
        <PlaceholderLine width={25} />
      </Placeholder>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: normalize(20),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: normalize(20),
  },
});

export { UserPlaceHolder };
