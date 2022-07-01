import React from 'react'
import { StyleSheet, View } from 'react-native'
import normalize from 'react-native-normalize'
import {
  Placeholder,
  PlaceholderMedia,
  PlaceholderLine,
  Fade,
} from 'rn-placeholder'

const QuotaItem = () => {
  return (
    <View style={styles.container}>
      <Placeholder
        Animation={Fade}
        Left={(props) => (
          <PlaceholderMedia isRound={true} style={styles.remain} />
        )}
      ></Placeholder>
      <View style={styles.gap}></View>
      <Placeholder Animation={Fade}>
        <PlaceholderLine width={50} />
        <PlaceholderLine width={30} />
      </Placeholder>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '50%',
  },
  total: {
    justifyContent: 'flex-end',
  },
  gap: {
    paddingVertical: normalize(10),
  },
  center: {
    alignItems: 'center',
  },
  remain: {
    width: 70,
    height: 90,
    borderRadius: 0,
  },
})

export { QuotaItem }
