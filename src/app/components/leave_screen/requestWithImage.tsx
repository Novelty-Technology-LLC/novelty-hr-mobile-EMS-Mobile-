import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { requestWithImageStyle as style } from '../../../assets/styles';
import colors from '../../../assets/colors';
import { AppIcon } from '../../common';
import getDay from '../approveRequest/getDay';

const RequestWithImage = ({ item, onPress }: any) => {
  let { dayRange, dayType } = getDay(item);

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
          <Text style={style.name}>
            {item.user.first_name + ' ' + item.user.last_name}
          </Text>
          <Text style={style.type}>{item.type}</Text>
          <View style={style.date}>
            <AppIcon name="calendar" size={18} color={colors.secondary} />
            <View style={style.gap}></View>
            <Text style={style.datetype}>
              {dayRange}(
              {dayType > 1 ? dayType + ' days' : (dayType = 1 + ' day')})
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default RequestWithImage;
