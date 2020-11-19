import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { dayStyle as style } from '../../../assets/styles';
import { AppIcon } from '../../common';

const Day = ({
  title,
  select,
  onPress,
  modal,
}: {
  title: string;
  select: boolean;
  onPress: Function;
  modal?: boolean;
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
      {modal && (
        <View style={style.gap}>
          <AppIcon
            name="calendar"
            size={25}
            color={!select ? style.selectText.color : style.unselectText.color}
          />
        </View>
      )}
    </TouchableOpacity>
  );
};

export default Day;
