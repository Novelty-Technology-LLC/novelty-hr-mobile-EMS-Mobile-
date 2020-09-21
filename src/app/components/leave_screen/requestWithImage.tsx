import React from 'react';
import { View, Text, Image } from 'react-native';
import { requestWithImageStyle as style } from '../../../assets/styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../../../assets/colors';
import State from './state';

const RequestWithImage = ({ item }: any) => {
  return (
    <View>
      <View style={style.row}>
        <Image
          style={style.image}
          source={require('../../../assets/images/person.jpeg')}
        />
        <View>
          <Text style={style.name}>{item.item.sender}</Text>
          <Text style={style.type}>{item.item.type}</Text>
          <View style={style.row}>
            <Icon name="calendar" size={8} color={colors.secondary} />
            <View style={style.gap}></View>
            <Text style={style.type}>{item.item.date}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default RequestWithImage;
