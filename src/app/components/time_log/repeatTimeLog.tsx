import React from 'react';
import { View, Text } from 'react-native';
import { timeLogStyle as style } from '../../../assets/styles';
import { createdDay, getHrs } from '../../utils';

const RepeatTimeLog = ({ key, value }: any) => {
  return (
    <>
      <View style={style.container}>
        <View style={style.dateView}>
          <View style={style.rowAlign}>
            <Text style={style.rdate}>{createdDay(value[0])}</Text>
          </View>
          {value.map((item) => (
            <>
              <View style={style.rowAlign}>
                <Text style={style.date}>{item.note}</Text>
                <Text style={style.duration}>{getHrs(item.duration)}</Text>
              </View>
              <Text style={style.type}>{item.project.name.toUpperCase()}</Text>
            </>
          ))}
        </View>
      </View>
    </>
  );
};

export { RepeatTimeLog };
