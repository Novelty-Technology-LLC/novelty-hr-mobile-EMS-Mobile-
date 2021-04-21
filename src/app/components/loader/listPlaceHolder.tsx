import React, { Fragment } from 'react';
import { StyleSheet, View } from 'react-native';
import normalize from 'react-native-normalize';
import { Placeholder, PlaceholderLine, Fade } from 'rn-placeholder';
const ListPlaceholder = () => {
  return (
    <View style={styles.container}>
      {[...Array(4)].map((item, index) => (
        <Fragment key={index}>
          <Placeholder style={styles.main} Animation={Fade}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <PlaceholderLine width={40} />
              <PlaceholderLine width={30} />
            </View>
            <PlaceholderLine width={50} />
          </Placeholder>
          {index % 2 === 0 && <View style={{ marginHorizontal: '1%' }} />}
        </Fragment>
      ))}
    </View>
  );
};

export { ListPlaceholder };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: normalize(20),
  },
  wrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  main: {
    width: '100%',
    marginBottom: normalize(40),
  },
});
