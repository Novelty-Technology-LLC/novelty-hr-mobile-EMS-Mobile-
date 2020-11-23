import React, { useState, useContext, useEffect, useCallback } from 'react';
import { View, Text, FlatList } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';

import { myRequestsStyle as style, historyStyle } from '../../../assets/styles';
import History from './history';
import { Request } from './request';
import Swipe from './swipe';
import colors from '../../../assets/colors';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { RequestContext } from '../../reducer';
import { AppIcon } from '../../common';
import { getUser, mapDataToRequest, mapObjectToRequest } from '../../utils';
import { getPastRequests } from '../../services';
import { UserPlaceHolder } from '../loader';
import { getLeave } from '../../services';

const MyRequests = ({
  loading,
  refresh,
  params,
}: {
  loading: boolean;
  refresh: number;
  params: number;
}) => {
  const navigation = useNavigation();
  const { requests, dispatchRequest } = useContext(RequestContext);
  let row: Array<any> = [];

  const [toggle, setToggle] = useState('toggle-switch');
  const getPast = async () => {
    const user = await getUser();
    getPastRequests(JSON.parse(user).id)
      .then((data) => {
        dispatchRequest({
          type: 'CHANGEPAST',
          payload: mapDataToRequest(data),
        });
      })
      .catch((err) => console.log('GetLeaveQuota error', err));
  };

  const getPastCallback = useCallback(() => getPast(), []);

  useEffect(() => {
    getPastCallback();
  }, [refresh, params]);

  useEffect(() => {
    const get = async () => {
      if (params) {
        let data = await getLeave(+params);
        data = mapObjectToRequest(data[0]);
        navigation.navigate('requestDetail', data[0]);
      }
    };
    get();
  }, [params]);

  return (
    <View style={style.container}>
      <View style={style.header}>
        <Text style={style.title}>My Requests</Text>
        {requests.pastrequests.length > 0 && (
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
                size={40}
              />
            </TouchableWithoutFeedback>
          </View>
        )}
      </View>
      {loading ? <UserPlaceHolder /> : null}

      {requests.requests[0] ? (
        <FlatList
          data={requests.requests}
          renderItem={(item) => (
            <Swipeable
              ref={(ref) => (row[item.index] = ref)}
              renderRightActions={() => (
                <Swipe
                  item={item.item}
                  onPress={() => row[item.index].close()}
                />
              )}
            >
              <Request
                item={item.item}
                other={false}
                onPress={() => navigation.navigate('requestDetail', item.item)}
              />
            </Swipeable>
          )}
          keyExtractor={(item) => item.id}
        />
      ) : (
        !loading && (
          <View style={style.emptyContainer}>
            <Text style={style.emptyText}>You don't have current requests</Text>
          </View>
        )
      )}

      {toggle === 'toggle-switch' &&
        (!requests.pastrequests ? (
          <>
            <View style={historyStyle.subcontainer}>
              <Text style={historyStyle.header}>Past Requests</Text>
              <View style={historyStyle.line}></View>
            </View>
            <UserPlaceHolder />
          </>
        ) : (
          <History requests={requests.pastrequests} />
        ))}
    </View>
  );
};

export { MyRequests };
