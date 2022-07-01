import React from 'react'

import { StyleProp, TextStyle, View } from 'react-native'
import normalize from 'react-native-normalize'

const sizes: any = {
  large: normalize(20),

  maxlarge: normalize(160),

  medium: normalize(10),

  small: normalize(5),
}

export const CustomDivider = ({
  value,

  size,

  axis,

  style,
}: {
  value?: number

  size?: string

  axis?: string

  style?: StyleProp<TextStyle>
}) => {
  return (
    <View
      style={[
        style,

        axis === 'horizontal'
          ? {
              marginHorizontal: value
                ? value
                : size
                ? sizes[size]
                : sizes['medium'],
            }
          : {
              marginVertical: value
                ? value
                : size
                ? sizes[size]
                : sizes['medium'],
            },
      ]}
    />
  )
}
