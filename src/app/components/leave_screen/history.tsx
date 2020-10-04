import React from 'react';
import { View, Text } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { historyStyle as style } from '../../../assets/styles';
import { Request } from './request';

const History = ({ requests, other }: any) => {
  return (
    <View style={style.container}>
      <View style={style.subcontainer}>
        <Text style={style.header}>Past Requests</Text>
        <View style={style.line}></View>
      </View>
      <FlatList
        data={requests}
        renderItem={(item) => <Request item={item.item} other={other} />}
        keyExtractor={(item) => item.date}
      />
    </View>
  );
};

export default History;
