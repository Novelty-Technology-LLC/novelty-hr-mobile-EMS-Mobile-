import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

const button = ({ style, title, onPress }) => {
  return (
    <>
      <TouchableOpacity onPress={onPress}>
        <View style={style.buttonView}>
          {title && <Text style={style.buttonText}>{title}</Text>}
        </View>
      </TouchableOpacity>
    </>
  );
};

export default button;
