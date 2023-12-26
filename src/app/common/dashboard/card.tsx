import React from 'react';
import { View, Text, StyleProp, ViewStyle } from 'react-native';
import { cardStyle } from '../../../assets/styles';
import { dashboarCard } from '../../utils';

const UpperCard = ({ item, module, containerStyle }: { item: any; module: any, containerStyle?: StyleProp<ViewStyle> }) => {
  return (
    <View style={[cardStyle.container, containerStyle]}>
      <View style={cardStyle.module}>{dashboarCard[module]}</View>
      <View style={cardStyle.textContainer}>
        <Text style={[cardStyle.title, cardStyle.titleText]}>
          {item?.title?.length > 42
            ? item.title.slice(0, 42) + '...'
            : item?.title}
        </Text>
        <Text style={[cardStyle.subTitle, cardStyle.subTitleText]}>
          {item.subTitle}
        </Text>
      </View>
    </View>
  );
};

export { UpperCard };
