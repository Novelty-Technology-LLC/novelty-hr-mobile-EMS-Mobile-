import React, { Fragment } from 'react';
import { StyleSheet, View } from 'react-native';
import normalize from 'react-native-normalize';
import { Placeholder, PlaceholderLine, Fade } from 'rn-placeholder';
import colors from '../../../assets/colors';
const ListPlaceholder = () => {
  return (
    <View style={styles.container}>
      {[...Array(10)].map((item, index) => (
        <Fragment key={index}>
          <Placeholder style={styles.main} Animation={Fade}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <PlaceholderLine width={40} />
              <PlaceholderLine width={30} style={styles.thinLine} />
            </View>
            <PlaceholderLine width={50} style={styles.thinLine} />
            <PlaceholderLine width={50} style={styles.thinLine} />
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
    marginBottom: normalize(20),
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGrey
  },
  thinLine: {
    height: normalize(8)
  }
});
