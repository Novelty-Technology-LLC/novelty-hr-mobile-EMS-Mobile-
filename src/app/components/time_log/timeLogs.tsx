import React, { useContext, useEffect, useState } from 'react';
import { View, Text, FlatList, ScrollView, RefreshControl } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { myRequestsStyle as style, historyStyle } from '../../../assets/styles';
import { TimeLogContext } from '../../reducer';
import { getAllTimeLogs } from '../../services/timeLogService';
import { getHrsToday, getUser, isThisWeek, totalWeekHours } from '../../utils';
import { DaysRemaining } from '../leave_screen/daysRemaining';
import Swipe from '../leave_screen/swipe';
import { QuotaPlaceHolder, UserPlaceHolder } from '../loader';
import { DaySelect } from './daySelect';
import { TimeLog } from './timelog';

const TimeLogs = () => {
  const [refreshing, setRefreshing] = React.useState(false);
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState('');
  const { timelogs, dispatchTimeLog } = useContext(TimeLogContext);
  const [logs, setLogs] = useState([]);

  const getTimeLogs = async () => {
    setLoading(true);
    const user = await getUser();
    getAllTimeLogs(JSON.parse(user).id)
      .then((res) => {
        setLoading(false);
        let thisw = res.filter((item) => isThisWeek(item));
        let pastw = res.filter((item) => !isThisWeek(item));

        dispatchTimeLog({
          type: 'CHANGE',
          payload: {
            present: thisw,
            past: pastw,
          },
        });
        setRefreshing(false);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getTimeLogs();
  }, [refreshing]);

  useEffect(() => {
    setLogs(
      timelogs.past
        .concat(timelogs.present)
        .filter(
          (item) =>
            new Date(item.log_date).toDateString() ===
            new Date(date === '' ? new Date() : date).toDateString()
        )
    );
  }, [timelogs]);

  let row: Array<any> = [];
  let row2: Array<any> = [];

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
      {loading ? (
        <QuotaPlaceHolder />
      ) : (
        <View style={{ flexDirection: 'row' }}>
          <DaysRemaining
            total={8}
            remaining={getHrsToday(timelogs.present)}
            title={'Today'}
            timelog={true}
          />
          <DaysRemaining
            total={40}
            remaining={Math.floor(totalWeekHours(timelogs.present) / 60)}
            title={'This Week'}
            timelog={true}
          />
        </View>
      )}

      <DaySelect
        handleChange={(date) => {
          setDate(date);
          setLogs(
            timelogs.past
              .concat(timelogs.present)
              .filter(
                (item) =>
                  new Date(item.log_date).toDateString() ===
                  new Date(date).toDateString()
              )
          );
        }}
      />

      {loading ? (
        <UserPlaceHolder />
      ) : logs[0] ? (
        <FlatList
          data={logs}
          renderItem={(item) => (
            <Swipeable
              ref={(ref) => (row[item.index] = ref)}
              renderRightActions={() => (
                <Swipe
                  timelog={true}
                  item={item.item}
                  onPress={() => row[item.index].close()}
                />
              )}
            >
              <TimeLog item={item.item} />
            </Swipeable>
          )}
          keyExtractor={(item) => item.id}
        />
      ) : (
        !loading && (
          <View style={style.emptyContainer}>
            <Text style={style.emptyText}>You don't have logs this day.</Text>
          </View>
        )
      )}
      <View style={style.logheader}>
        <Text style={style.title}>This Week</Text>
      </View>

      <View style={historyStyle.timelogcontainer}>
        {loading ? (
          <UserPlaceHolder />
        ) : timelogs.present[0] ? (
          <FlatList
            data={timelogs.present}
            renderItem={(item) => <TimeLog item={item.item} />}
            keyExtractor={(item) => item.id}
          />
        ) : (
          !timelogs.present[0] && (
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
