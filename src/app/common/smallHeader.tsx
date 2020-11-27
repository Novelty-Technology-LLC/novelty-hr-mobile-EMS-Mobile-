import { smallHeaderStyle as style } from '../../assets/styles';
import React from 'react';
import { Text, View } from 'react-native';

const SmallHeader = ({
  text,
  history,
}: {
  text: string;
  history?: Boolean;
}) => {
  return (
    <View
      style={
        !history
          ? style.subcontainer
          : [style.subcontainer, style.historyContainer]
      }
    >
      <Text style={style.header}>{text}</Text>
      <View style={style.line}></View>
    </View>
  );
};

export { SmallHeader };
