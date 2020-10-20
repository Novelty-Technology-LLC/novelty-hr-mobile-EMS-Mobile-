import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { historyStyle as style, myRequestsStyle } from '../../../assets/styles';
import { Request } from './request';

const History = ({ requests, other }: any) => {
  const navigation = useNavigation();

  return (
    <View style={style.container}>
      <View style={style.subcontainer}>
        <Text style={style.header}>Past Requests</Text>
        <View style={style.line}></View>
      </View>
      {requests.length > 0 ? (
        <FlatList
          data={requests}
          renderItem={(item) => (
            <Request
              item={item.item}
              other={other}
              onPress={() => navigation.navigate('requestDetail', item.item)}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <View style={myRequestsStyle.emptyContainer}>
          <Text style={myRequestsStyle.emptyText}>
            You don't have past requests
          </Text>
        </View>
      )}
    </View>
  );
};

export default History;
