import React, { useState, useContext } from 'react';
import { View, Text, FlatList } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';

import { myRequestsStyle as style } from '../../../assets/styles';
import History from './history';
import { Request } from './request';
import Swipe from './swipe';
import colors from '../../../assets/colors';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { RequestContext } from '../../reducer';
import { AppIcon, Loader } from '../../common';

const MyRequests = ({ loading }: { loading: boolean }) => {
  const navigation = useNavigation();
  const { requests } = useContext(RequestContext);

  const [toggle, setToggle] = useState('toggle-switch');

  return (
    <View style={style.container}>
      <View style={style.header}>
        <Text style={style.title}>My Requests</Text>
        <View style={style.row}>
          <Text style={style.history}> History</Text>
          <View style={style.gap}></View>
          <TouchableWithoutFeedback
            onPress={() => {
              setToggle(
                toggle === 'toggle-switch'
                  ? 'toggle-switch-off'
                  : 'toggle-switch'
              );
            }}
          >
            <AppIcon
              name={toggle}
              color={
                toggle === 'toggle-switch' ? colors.primary : colors.secondary
              }
              size={35}
            />
          </TouchableWithoutFeedback>
        </View>
      </View>
      {loading ? <Loader color="black" size={20} /> : null}
      {requests.requests[0] ? (
        <FlatList
          data={requests.requests}
          renderItem={(item) => (
            <Swipeable renderRightActions={() => <Swipe item={item.item} />}>
              <Request
                item={item.item}
                other={false}
                onPress={() => navigation.navigate('requestDetail', item.item)}
              />
            </Swipeable>
          )}
          keyExtractor={(item) => item.date}
        />
      ) : (
        !loading && (
          <View style={style.emptyContainer}>
            <Text style={style.emptyText}>There are not current Requests</Text>
          </View>
        )
      )}

      {toggle === 'toggle-switch' && <History />}
    </View>
  );
};

export { MyRequests };
