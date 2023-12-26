import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import normalize from 'react-native-normalize';
import {
  Placeholder,
  PlaceholderMedia,
  PlaceholderLine,
  Fade,
} from 'rn-placeholder';
const placeholderNumber = [...new Array(3).fill({})];

const ResponsePlaceHolder = () => {
  return (
    <FlatList
      pagingEnabled={true}
      showsHorizontalScrollIndicator={false}
      legacyImplementation={false}
      data={placeholderNumber}
      renderItem={(item) => (
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
      )}
      keyExtractor={(photo) => photo.id}
    />
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

export { ResponsePlaceHolder };
