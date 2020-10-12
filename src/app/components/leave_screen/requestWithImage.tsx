import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { requestWithImageStyle as style } from '../../../assets/styles';
import colors from '../../../assets/colors';
import { AppIcon } from '../../common';
import getDay from '../../utils/getDay';
import getName from '../../utils/getName';

const RequestWithImage = ({ item, onPress }: any) => {
  let { dayRange } = getDay(item);
  let { name } = getName(item);

  return (
    <TouchableOpacity onPress={() => onPress && onPress()}>
      <View style={style.row}>
        <Image
          style={style.image}
          source={
            item.user.image_url
              ? { uri: item.user.image_url }
              : require('../../../assets/images/person.jpeg')
          }
        />
        <View>
          <Text style={style.name}>{name}</Text>
          <Text style={style.type}>{item.type}</Text>
          <View style={style.date}>
            <AppIcon name="calendar" size={18} color={colors.secondary} />
            <View style={style.gap}></View>
            <Text style={style.datetype}>{dayRange}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default RequestWithImage;
