import React from 'react';
import { View, Text } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { historyStyle as style } from '../../../assets/styles';
import { Request } from './request';

const History = ({ other }: any) => {
  const pastrequests = [
    {
      id: 1,
      date: 'Sept 20-23 (3 days)',
      type: 'PAID TIME OFF',
      state: 'Approved',
      sender: 'Biren Gurung',
    },
    {
      id: 2,
      date: 'Jan 28 (1 day)',
      type: 'FLOATING',
      state: 'Denied',
      sender: 'Biren Gurung',
    },
  ];

  return (
    <View style={style.container}>
      <View style={style.subcontainer}>
        <Text style={style.header}>Past Requests</Text>
        <View style={style.line}></View>
      </View>
      <FlatList
        data={pastrequests}
        renderItem={(item) => <Request item={item.item} other={other} />}
        keyExtractor={(item) => item.date}
      />
    </View>
  );
};

export default History;
