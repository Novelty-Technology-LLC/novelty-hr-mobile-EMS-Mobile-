import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import normalize from 'react-native-normalize';
import {
  Placeholder,
  PlaceholderLine,
  Fade,
  PlaceholderMedia,
} from 'rn-placeholder';
const placeholderNumber = [...new Array(3).fill({})];

const LeadPlaceHolder = () => {
  return (
    <FlatList
      horizontal
      pagingEnabled={true}
      showsHorizontalScrollIndicator={false}
      legacyImplementation={false}
      data={placeholderNumber}
      renderItem={(item) => (
        <View style={styles.container}>
          <Placeholder
            Animation={Fade}
            Left={(props) => (
              <PlaceholderMedia isRound={true} style={styles.photo} />
            )}
          ></Placeholder>
          <View style={styles.gap}></View>
          <Placeholder Animation={Fade}>
            <PlaceholderLine width={100} />
          </Placeholder>
        </View>
      )}
      keyExtractor={(photo) => photo.id}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: normalize(40),
    paddingVertical: normalize(20),
  },
  gap: {
    paddingVertical: 5,
  },
  photo: {
    width: normalize(60),
    height: normalize(60),
  },
});

export { LeadPlaceHolder };
