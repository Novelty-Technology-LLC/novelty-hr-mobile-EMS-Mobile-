import React from 'react';
import { View, Text } from 'react-native';
import { timeLogStyle } from '../../../assets/styles';
import { getHrs } from '../../utils';

const Task = ({ item }: any) => {
  return (
    <View style={timeLogStyle.container}>
      <View style={timeLogStyle.dateView}>
        <View style={timeLogStyle.rowAlign}>
          <Text style={[timeLogStyle.date, { flex: 4 }]}>{item.task}</Text>
          <Text style={[timeLogStyle.duration, { flex: 1, textAlign: 'right' }]}>{getHrs(item.time)}</Text>
        </View>
      </View>
    </View>
  );
};

export { Task };
