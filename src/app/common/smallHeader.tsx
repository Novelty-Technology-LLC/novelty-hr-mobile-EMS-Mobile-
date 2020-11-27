import { smallHeaderStyle as style } from '../../assets/styles';
import React from 'react';
import { Text, View } from 'react-native';

const SmallHeader = ({ text }: { text: string }) => {
  return (
    <View style={style.subcontainer}>
      <Text style={style.header}>{text}</Text>
      <View style={style.line}></View>
    </View>
  );
};

export { SmallHeader };
