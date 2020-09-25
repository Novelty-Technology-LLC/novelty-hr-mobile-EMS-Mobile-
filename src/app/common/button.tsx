import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

const button = ({ style, title, onPress }) => {
  return (
    <>
      <TouchableOpacity onPress={onPress}>
        <View>{title && <Text style={style}>{title}</Text>}</View>
      </TouchableOpacity>
    </>
  );
};

export default button;
