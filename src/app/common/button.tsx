import React, { Children } from 'react'
import { TouchableOpacity } from 'react-native'

interface buttonPropType {
  style?: object
  title?: string
  onPress(): Function
  children: any
  disabled?: boolean
}

const button = ({ children, onPress, disabled }: buttonPropType) => {
  return (
    <>
      <TouchableOpacity onPress={onPress} disabled={disabled}>
        {children}
      </TouchableOpacity>
    </>
  )
}

export { button }
