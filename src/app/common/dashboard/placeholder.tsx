import React, { Fragment } from 'react';
import { StyleSheet, View } from 'react-native';
import normalize from 'react-native-normalize';
import { Placeholder, PlaceholderLine, Fade } from 'rn-placeholder';
const DashboardCardPlaceholder = () => {
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        {[...Array(4)].map((item, index) => (
          <Fragment key={index}>
            <Placeholder style={styles.main} Animation={Fade}>
              <PlaceholderLine width={80} />
              <PlaceholderLine />
              <PlaceholderLine width={50} />
              <PlaceholderLine width={40} />
            </Placeholder>
            {index % 2 === 0 && <View style={{ marginHorizontal: '1%' }} />}
          </Fragment>
        ))}
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
    flexWrap: 'wrap',
  },
  main: {
    width: '49%',
    marginBottom: normalize(40),
  },
});
