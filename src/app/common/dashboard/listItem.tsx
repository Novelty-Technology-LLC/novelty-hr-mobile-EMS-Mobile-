import React from 'react';
import { View, Text } from 'react-native';
import colors from '../../../assets/colors';
import { cardStyle, listStyle, timeLogStyle } from '../../../assets/styles';
import { getColor } from '../../utils/listtranform';
import normalize from '../../utils/normalize';

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
  const indicatorColor = getColor(type, colors.lightbrown);

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
            marginRight: normalize(-1),
          },
        ]}
      />
    </View>
  );
};

export { ListItem };
