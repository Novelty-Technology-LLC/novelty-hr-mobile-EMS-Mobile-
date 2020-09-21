import React from 'react';
import { Text, View } from 'react-native';

const button = ({ style, title }) => {
  return (
    <View style={style.buttonView}>
      {title && <Text style={style.buttonText}>{title}</Text>}
    </View>
  );
};

export default button;
