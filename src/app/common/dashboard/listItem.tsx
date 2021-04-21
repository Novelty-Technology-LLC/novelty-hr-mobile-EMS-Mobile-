import React from 'react';
import { View, Text } from 'react-native';
import normalize from 'react-native-normalize';
import { listStyle } from '../../../assets/styles';

const ListItem = ({
  title,
  subTitle,
  isLast,
}: {
  title: string;
  subTitle: string;
  isLast: boolean;
}) => {
  return (
    <View
      style={[
        listStyle.itemContainer,
        {
          borderBottomWidth: isLast ? 0 : normalize(3),
        },
      ]}
    >
      <Text style={listStyle.title}>{title}</Text>
      <Text style={listStyle.subTitle}>{subTitle}</Text>
    </View>
  );
};

export { ListItem };
