import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import {
  FlatList,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import { myRequestsStyle, otherRequestsStyle } from '../../../assets/styles';
import colors from '../../../assets/colors';
import { Request } from './request';
import History from './history';
import { useNavigation } from '@react-navigation/native';
import { AppIcon } from '../../common';
import { getAllRequests } from '../../services';

const OtherRequests = () => {
  const navigation = useNavigation();
  const [toggle, setToggle] = useState('toggle-switch');
  const [requests, setRequests] = useState([]);
  useEffect(() => {
    const request = async () => {
      const data = await getAllRequests();
      setRequests(data);
    };
    request();
  }, []);

  return (
    <View style={otherRequestsStyle.container}>
      <View style={otherRequestsStyle.header}>
        <Text style={myRequestsStyle.title}> Requests Recieved</Text>
        <View style={myRequestsStyle.row}>
          <Text style={myRequestsStyle.history}> History</Text>
          <View style={myRequestsStyle.gap}></View>
          <TouchableWithoutFeedback
            onPress={() =>
              setToggle(
                toggle === 'toggle-switch'
                  ? 'toggle-switch-off'
                  : 'toggle-switch'
              )
            }
          >
            <AppIcon
              name={toggle}
              color={
                toggle === 'toggle-switch' ? colors.primary : colors.secondary
              }
              size={40}
            />
          </TouchableWithoutFeedback>
        </View>
      </View>
      <FlatList
        data={requests}
        renderItem={(item) => (
          <Request
            item={item.item}
            other={true}
            recieved={true}
            onPress={() => navigation.navigate('approveLeave', item.item)}
          />
        )}
        keyExtractor={(item) => item.id}
      />
      {toggle === 'toggle-switch' && <History other={true} data={requests} />}
    </View>
  );
};

export default OtherRequests;
