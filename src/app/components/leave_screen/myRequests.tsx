<<<<<<< HEAD
<<<<<<< HEAD
import React, { useState, useContext, useEffect, useCallback } from "react";
import { View, Text, FlatList, TouchableWithoutFeedback } from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";

import { myRequestsStyle as style } from "../../../assets/styles";
import History from "./history";
import { Request } from "./request";
import Swipe from "./swipe";
import { useNavigation } from "@react-navigation/native";
import { RequestContext } from "../../reducer";
import { EmptyContainer, SmallHeader } from "../../common";
import { getUser, mapDataToRequest, mapObjectToRequest } from "../../utils";
import { getPastRequests } from "../../services";
import { UserPlaceHolder } from "../loader";
import { getLeave } from "../../services";
import HistoryToggle from "../../common/historyToggle";
=======
import React, { useState, useContext, useEffect, useCallback } from 'react'
import { View, Text, FlatList, TouchableWithoutFeedback } from 'react-native'
import Swipeable from 'react-native-gesture-handler/Swipeable'

import { myRequestsStyle as style } from '../../../assets/styles'
import History from './history'
import { Request } from './request'
import Swipe from './swipe'
import { useNavigation } from '@react-navigation/native'
import { RequestContext } from '../../reducer'
import { EmptyContainer, SmallHeader } from '../../common'
import { getUser, mapDataToRequest, mapObjectToRequest } from '../../utils'
import { getPastRequests } from '../../services'
import { UserPlaceHolder } from '../loader'
import { getLeave } from '../../services'
import HistoryToggle from '../../common/historyToggle'
import moment from 'moment'
>>>>>>> 20f91fa9de4a7d3896011119e125a212631f0b31
=======
import React, { useState, useContext, useEffect, useCallback } from 'react';
import { View, Text, FlatList, TouchableWithoutFeedback } from 'react-native';
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
import moment from 'moment';
>>>>>>> 6cca8aad86875385f183aab23c5f8da705c430cf

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
  const [history, setHistory] = useState(false);
  const { requests, dispatchRequest } = useContext(RequestContext);
  let row: Array<any> = [];

  const [toggle, setToggle] = useState('toggle-switch-off');
  const getPast = async () => {
    const user = await getUser();
    getPastRequests(JSON.parse(user).id)
      .then((data) => {
        dispatchRequest({
          type: "CHANGEPAST",
          payload: mapDataToRequest(data),
        });
      })
      .catch((err) => console.log('GetLeaveQuota error', err));
  };

  const getPastCallback = useCallback(() => getPast(), []);

  useEffect(() => {
    getPastCallback();
    row.map((item) => item.close());
    setToggle('toggle-switch-off');
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
  const renderItem = (item: any) => {
    const leaveDate = moment(item.item.leave_date.startDate).format(
      'YYYY-MM-DD'
    );
    const today = moment(new Date()).format('YYYY-MM-DD');
    if (leaveDate >= today) {
      if (leaveDate == today && new Date().getHours() >= 10) {
        return (
          <Request
            item={item.item}
            other={false}
            onPress={() => navigation.navigate('requestDetail', item.item)}
          />
        );
      } else {
        return (
          <Swipeable
            ref={(ref) => (row[item.index] = ref)}
            renderRightActions={() => (
              <Swipe item={item.item} onPress={() => row[item.index].close()} />
            )}
          >
            <Request
              item={item.item}
              other={false}
              onPress={() => navigation.navigate('requestDetail', item.item)}
            />
          </Swipeable>
        );
      }
    } else {
      return (
        <Request
          item={item.item}
          other={false}
          onPress={() => navigation.navigate('requestDetail', item.item)}
        />
      );
    }
  };
  console.log('requests.pastrequests', requests.pastrequests);

  return (
    <View style={style.container}>
      <TouchableWithoutFeedback
        onPress={() => {
          setToggle(
            toggle === 'toggle-switch' ? 'toggle-switch-off' : 'toggle-switch'
          );
        }}
      >
        {/*  new Date(item.item.leave_date.startDate) <= new Date() &&
            new Date().getHours() >= 10 ? */}
        <View style={style.header}>
          <SmallHeader
            text='My Requests'
            history={requests.pastrequests.length > 0}
          />
          {requests.pastrequests.length > 0 && (
            <HistoryToggle
              toggle={toggle}
              screen='leave'
              setHistory={setHistory}
              history={history}
            />
          )}
        </View>
      </TouchableWithoutFeedback>
      {loading ? <UserPlaceHolder /> : null}
      {requests.requests[0] ? (
        <FlatList
          data={requests.requests}
          renderItem={renderItem}
          // new Date().getHours() >= 16 && item.item.state === 'Approved'?
          keyExtractor={(item) => item.id}
        />
      ) : (
        !loading && <EmptyContainer text="You don't have current requests" />
      )}

      {toggle === "toggle-switch" &&
        (!requests.pastrequests ? (
          <>
            <SmallHeader text='Past Requests' />
            <UserPlaceHolder />
          </>
        ) : (
          <History requests={requests.pastrequests} refresh={refresh} />
        ))}
    </View>
  );
};

export { MyRequests };
