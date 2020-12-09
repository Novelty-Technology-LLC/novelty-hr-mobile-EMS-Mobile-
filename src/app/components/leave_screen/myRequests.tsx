import React, { useState, useContext, useEffect, useCallback } from 'react';
import { View, Text, FlatList } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';

import { myRequestsStyle as style } from '../../../assets/styles';
import History from './history';
import { Request } from './request';
import Swipe from './swipe';
import { useNavigation } from '@react-navigation/native';
import { RequestContext } from '../../reducer';
import { EmptyContainer, SmallHeader } from '../../common';
import { getUser, mapDataToRequest, mapObjectToRequest } from '../../utils';
import { getPastRequests } from '../../services';
import { UserPlaceHolder } from '../loader';
import { getLeave } from '../../services';
import HistoryToggle from '../../common/historyToggle';

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
    row.map((item) => item.close());
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
        <SmallHeader
          text="My Requests"
          history={requests.pastrequests.length > 0}
        />
        {requests.pastrequests.length > 0 && (
          <HistoryToggle toggle={toggle} setToggle={setToggle} />
        )}
      </View>
      {loading ? <UserPlaceHolder /> : null}

      {requests.requests[0] ? (
        <FlatList
          data={requests.requests}
          renderItem={(item) =>
            item.item.state === 'In Progress' &&
            new Date(item.item.leave_date.startDate) < new Date() ? (
              <Request
                item={item.item}
                other={false}
                onPress={() => navigation.navigate('requestDetail', item.item)}
              />
            ) : (
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
                  onPress={() =>
                    navigation.navigate('requestDetail', item.item)
                  }
                />
              </Swipeable>
            )
          }
          keyExtractor={(item) => item.id}
        />
      ) : (
        !loading && <EmptyContainer text="You don't have current requests" />
      )}

      {toggle === 'toggle-switch' &&
        (!requests.pastrequests ? (
          <>
            <SmallHeader text="Past Requests" />
            <UserPlaceHolder />
          </>
        ) : (
          <History requests={requests.pastrequests} refresh={refresh} />
        ))}
    </View>
  );
};

export { MyRequests };
