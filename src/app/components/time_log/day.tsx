import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { dayStyle as style } from '../../../assets/styles';

const Day = ({
  title,
  select,
  onPress,
}: {
  title: string;
  select: boolean;
  onPress: Function;
}) => {
  return (
    <TouchableOpacity
      style={[style.container, !select ? style.selectView : style.unselectView]}
      onPress={onPress}
    >
      <Text
        style={[style.title, !select ? style.selectText : style.unselectText]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Day;
