import React from 'react';
import { View, Text } from 'react-native';
import normalize from 'react-native-normalize';
import { cardStyle, listStyle } from '../../../assets/styles';

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
      <Text style={cardStyle.titleText}>{title}</Text>
      <Text style={cardStyle.subTitleText}>{subTitle}</Text>
    </View>
  );
};

export { ListItem };
