import React from 'react';
import { Text, View } from 'react-native';

const button = ({ style, title }) => {
  return <View>{title && <Text style={style}>{title}</Text>}</View>;
};

export default button;
