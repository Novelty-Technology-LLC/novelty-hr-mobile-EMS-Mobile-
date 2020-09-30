import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { requestWithImageStyle as style } from '../../../assets/styles';
import colors from '../../../assets/colors';
import { AppIcon } from '../../common';

const RequestWithImage = ({ item, onPress }: any) => {
  let day =
    +item.leave_date.endDate.slice(8, 10) -
    +item.leave_date.startDate.slice(8, 10);

  return (
    <TouchableOpacity onPress={() => onPress && onPress()}>
      <View style={style.row}>
        <Image
          style={style.image}
          source={require('../../../assets/images/person.jpeg')}
        />
        <View>
          <Text style={style.name}>
            {item.user.first_name + ' ' + item.user.last_name}
          </Text>
          <Text style={style.type}>{item.type.slice(0, 8)}</Text>
          <View style={style.date}>
            <AppIcon name="calendar" size={18} color={colors.secondary} />
            <View style={style.gap}></View>
            <Text style={style.datetype}>
              {item.leave_date.startDate.slice(3, 10) +
                '-' +
                item.leave_date.endDate.slice(8, 10) +
                ' '}
              ({day + 'days'})
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default RequestWithImage;
