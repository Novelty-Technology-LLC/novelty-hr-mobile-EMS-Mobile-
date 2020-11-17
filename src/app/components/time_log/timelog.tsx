import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { timeLogStyle as style } from '../../../assets/styles';
import { createdDay, getHrs, totalHours } from '../../utils';

const TimeLog = ({ item }: any) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.navigate('logtime', item)}>
      <View style={style.container}>
        <View style={style.dateView}>
          <View style={style.rowAlign}>
            <Text style={style.date}>{item.project.name.toUpperCase()}</Text>
            <Text style={style.duration}>{getHrs(totalHours(item))}</Text>
          </View>
          <View style={style.rowAlign}>
            <Text style={style.type}>Entries: {item.note.length}</Text>
            <Text style={style.cdate}>{createdDay(item)}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export { TimeLog };
