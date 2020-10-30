import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ScrollView, RefreshControl } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import colors from '../../../assets/colors';
import { myRequestsStyle as style, historyStyle } from '../../../assets/styles';
import { AppIcon } from '../../common';
import { getAllTimeLogs } from '../../services/timeLogService';
import { getUser } from '../../utils';
import { UserPlaceHolder } from '../loader';
import { TimeLog } from './timelog';

const TimeLogs = () => {
  const [toggle, setToggle] = useState('toggle-switch');
  const [refreshing, setRefreshing] = React.useState(false);
  const [loading, setLoading] = useState(true);
  const [thisweek, setThisweek] = useState([]);
  const [pastweeks, setPastweeks] = useState([]);

  const getTimeLogs = async () => {
    setLoading(true);
    setThisweek([]);
    setPastweeks([]);
    const user = await getUser();
    getAllTimeLogs(JSON.parse(user).id)
      .then((res) => {
        setLoading(false);
        let thisw = res.filter(
          (item) => new Date().getDate() - new Date(item.log_date).getDate() < 7
        );
        setThisweek(thisw);
        let pastw = res.filter(
          (item) =>
            new Date().getDate() - new Date(item.log_date).getDate() >= 7
        );
        setPastweeks(pastw);

        setRefreshing(false);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getTimeLogs();
  }, [refreshing]);

  return (
    <ScrollView
      style={style.container}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={() => setRefreshing(true)}
        />
      }
    >
      <View style={style.header}>
        <Text style={style.title}>This Week</Text>
        {pastweeks.length > 0 && (
          <View style={style.row}>
            <Text style={style.history}>Past Weeks</Text>
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
      {thisweek[0] ? (
        <FlatList
          data={thisweek}
          renderItem={(item) => <TimeLog item={item.item} />}
          keyExtractor={(item) => item.id}
        />
      ) : (
        !loading && (
          <View style={style.emptyContainer}>
            <Text style={style.emptyText}>You don't have logs this week.</Text>
          </View>
        )
      )}
      <View style={historyStyle.timelogcontainer}>
        <View style={historyStyle.subcontainer}>
          <Text style={historyStyle.header}>Past Weeks</Text>
          <View style={historyStyle.line}></View>
        </View>
        {loading ? <UserPlaceHolder /> : null}
        {toggle === 'toggle-switch' && pastweeks[0] ? (
          <FlatList
            data={pastweeks}
            renderItem={(item) => <TimeLog item={item.item} />}
            keyExtractor={(item) => item.id}
          />
        ) : (
          !loading &&
          !pastweeks[0] && (
            <View style={style.emptyContainer}>
              <Text style={style.emptyText}>You don't have past logs.</Text>
            </View>
          )
        )}
      </View>
    </ScrollView>
  );
};

export { TimeLogs };
