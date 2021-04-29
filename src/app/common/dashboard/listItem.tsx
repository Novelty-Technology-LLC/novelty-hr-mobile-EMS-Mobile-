import React from 'react';
import { View, Text } from 'react-native';
import colors from '../../../assets/colors';
import { cardStyle, listStyle, timeLogStyle } from '../../../assets/styles';

const ListItem = ({
  title,
  subTitle,
  isLast,
  type,
}: {
  title: string;
  subTitle: string;
  isLast: boolean;
  type?: string;
}) => {
  const indicatorColor =
    type === 'holiday'
      ? colors.lightred
      : type === 'event'
      ? colors.blue
      : colors.lightbrown;

  return (
    <View
      style={[
        listStyle.itemContainer,
        {
          borderBottomWidth: isLast ? 0 : 1,
        },
      ]}
    >
      <Text style={cardStyle.titleText}>{title}</Text>
      <Text style={cardStyle.subTitleText}>{subTitle}</Text>

      <View
        style={[
          timeLogStyle.indicator,
          cardStyle.indicator,
          {
            backgroundColor: indicatorColor,
          },
        ]}
      />
    </View>
  );
};

export { ListItem };
