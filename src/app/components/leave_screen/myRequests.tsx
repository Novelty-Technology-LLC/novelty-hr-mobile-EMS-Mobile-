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
import { getUser, mapDataToRequest } from '../../utils';
import { getPastRequests } from '../../services';
import { UserPlaceHolder } from '../loader';

const MyRequests = ({
  loading,
  refresh,
}: {
  loading: boolean;
  refresh: number;
}) => {
  const navigation = useNavigation();
  const [pastrequests, setPastrequests] = useState(null);
  const { requests } = useContext(RequestContext);

  const [toggle, setToggle] = useState('toggle-switch');
  const getPast = async () => {
    console.log('once in call');
    
    const user = await getUser();
    getPastRequests(JSON.parse(user).id)
      .then((data) => setPastrequests(data))
      .catch((err) => console.log('GetLeaveQuota error', err));
  };

  const getPastCallback = useCallback(() => getPast(), []);

  useEffect(() => {
    getPastCallback()
  }, [refresh]);

  
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
      {loading ? <UserPlaceHolder /> : null}

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
            <Text style={style.emptyText}>There are no current requests</Text>
          </View>
        )
      )}

      {toggle === 'toggle-switch' &&
        (!pastrequests ? (
          <>
            <View style={historyStyle.subcontainer}>
              <Text style={historyStyle.header}>Past Requests</Text>
              <View style={historyStyle.line}></View>
            </View>
            <UserPlaceHolder />
          </>
        ) : (
          <History requests={mapDataToRequest(pastrequests)} />
        ))}
    </View>
  );
};

export { MyRequests };
