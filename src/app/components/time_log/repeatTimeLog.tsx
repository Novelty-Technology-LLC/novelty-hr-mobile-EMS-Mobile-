import React from 'react';
import { View, Text } from 'react-native';
import { timeLogStyle as style } from '../../../assets/styles';
import { createdDay, getHrs, totalHours } from '../../utils';

const RepeatTimeLog = ({ key, value }: any) => {
  return (
    <>
      <View style={style.container}>
        <View style={style.dateView}>
          <View style={style.rowAlign}>
            <Text style={style.date}>Tasks: {value.length} </Text>
            <Text style={style.duration}>{getHrs(totalHours(value))}</Text>
          </View>
          <View style={style.rowAlign}>
            <Text style={style.type}>
              {value[0].project.name.toUpperCase()}
            </Text>
            <Text style={style.rdate}>{createdDay(value[0])}</Text>
          </View>
        </View>
      </View>
    </>
  );
};

export { RepeatTimeLog };
