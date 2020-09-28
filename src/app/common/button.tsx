import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

interface buttonPropType {
  style: object;
  title: string;
  onPress: Function;
}

const button = ({ style, title, onPress }) => {
  return (
    <>
      <TouchableOpacity onPress={onPress}>
        {title && <Text style={style}>{title}</Text>}
      </TouchableOpacity>
    </>
  );
};

export { button };
