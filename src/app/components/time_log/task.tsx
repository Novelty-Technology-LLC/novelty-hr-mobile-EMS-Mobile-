import React from 'react';
import { View, Text, TextInput } from 'react-native';
import {
  calenderStyle,
  descriptionStyle as style,
  timeLogStyle,
} from '../../../assets/styles';
import { getHrs } from '../../utils';

const Task = ({ item }: any) => {
  return (
    <View style={timeLogStyle.container}>
      <View style={timeLogStyle.dateView}>
        <View style={timeLogStyle.rowAlign}>
          <Text style={timeLogStyle.date}>{item.note}</Text>
          <Text style={timeLogStyle.duration}>{getHrs(item.duration)}</Text>
        </View>
      </View>
    </View>
  );
};

export { Task };
