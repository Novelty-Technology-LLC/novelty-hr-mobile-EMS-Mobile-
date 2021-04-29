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
              {index > 1 && (
                <>
                  <PlaceholderLine width={30} style={{ marginVertical: normalize(10) }} />
                  <PlaceholderLine width={90} />
                  <PlaceholderLine width={70} />
                  <PlaceholderLine width={60} />
                  <PlaceholderLine width={55} />
                </>
              )}
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
    marginTop: normalize(40),
    padding: normalize(10)
  },
  wrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  main: {
    width: '49%',
    marginBottom: normalize(30),
  },
});
