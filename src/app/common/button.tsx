import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

const button = ({ style, title, onPress }) => {
  return (
    <>
      <TouchableOpacity onPress={onPress}>
        {title && <Text style={style}>{title}</Text>}
      </TouchableOpacity>
    </>
  );
};

export default button;
