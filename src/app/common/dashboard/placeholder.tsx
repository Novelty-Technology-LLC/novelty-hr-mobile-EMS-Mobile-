import { StyleService } from '@ui-kitten/components';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Placeholder, PlaceholderLine, Fade } from 'rn-placeholder';
const DashboardCardPlaceholder = () => {
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Placeholder style={styles.main} Animation={Fade}>
          <PlaceholderLine width={80} />
          <PlaceholderLine />
          <PlaceholderLine width={30} />
        </Placeholder>
        <View style={{ marginHorizontal: 20 }} />
        <Placeholder style={styles.main} Animation={Fade}>
          <PlaceholderLine width={80} />
          <PlaceholderLine />
          <PlaceholderLine width={30} />
        </Placeholder>
      </View>
    </View>
  );
};

export { DashboardCardPlaceholder };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  wrapper: {
    flexDirection: 'row',
    flex: 0.2,
  },
  main: {
    flex: 0.5,
  },
});
