import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { timeLogStyle as style } from '../../../assets/styles';
import { createdDay, getHrs } from '../../utils';

const TimeLog = ({ item }: any) => {
  //   let { day } = getDay(item);

  return (
    <>
      <TouchableOpacity style={style.container} onPress={() => {}}>
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
      </TouchableOpacity>
    </>
  );
};

export { TimeLog };
