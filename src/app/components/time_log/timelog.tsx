import React from 'react';
import { View, Text } from 'react-native';
import { timeLogStyle as style } from '../../../assets/styles';
import { createdDay, getHrs } from '../../utils';

const TimeLog = ({ item }: any) => {
  return (
    <>
      <View style={style.container}>
        <View style={style.dateView}>
          <View style={style.rowAlign}>
            <Text style={style.date}>{item.note}</Text>
            <Text style={style.duration}>{getHrs(item.duration)}</Text>
          </View>

          <View style={style.rowAlign}>
            <Text style={style.type}>{item.project.name.toUpperCase()}</Text>
            <Text style={style.cdate}>{createdDay(item)}</Text>
          </View>
        </View>
      </View>
    </>
  );
};

export { TimeLog };
