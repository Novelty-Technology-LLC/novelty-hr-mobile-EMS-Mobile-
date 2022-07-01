import { View, Image } from 'react-native'
import React, { useState } from 'react'

export function CustomFullScreenImage({
  route: {
    params: { image },
  },
}: any): any {
  const [onLoadImage, setLoadImage] = useState(true)
  const imageLoading = () => {
    setLoadImage(false)
  }
  return (
    <View>
      <Image
        source={
          onLoadImage
            ? { uri: image }
            : require('../../../assets/images/employee.png')
        }
        onPartialLoad={() => imageLoading()}
        onError={(error) => imageLoading()}
      />
    </View>
  )
}
