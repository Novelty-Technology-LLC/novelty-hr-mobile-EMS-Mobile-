import { smallHeaderStyle as style } from '../../assets/styles';
import React from 'react';
import { Text, View } from 'react-native';

const SmallHeader = ({ text, leave }: { text: string; leave?: Boolean }) => {
  return (
    <View style={style.subcontainer}>
      <Text style={style.header}>{text}</Text>
      <View style={!leave ? style.line : [style.line, style.leaveline]}></View>
    </View>
  );
};

export { SmallHeader };
