import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

interface buttonPropType {
  style: object;
  title: string;
  onPress: Function;
}

const button = ({ style, title, onPress }: buttonPropType) => {
  return (
    <>
      <TouchableOpacity onPress={onPress}>
        <View>{title && <Text style={style}>{title}</Text>}</View>
      </TouchableOpacity>
    </>
  );
};

export { button };
