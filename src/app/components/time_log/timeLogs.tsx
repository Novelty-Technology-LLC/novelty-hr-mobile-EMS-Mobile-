import { useScrollToTop } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import { View, FlatList, ScrollView, RefreshControl } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { myRequestsStyle as style } from '../../../assets/styles';
import { TimeLogContext } from '../../reducer';
import { getAllTimeLogs } from '../../services/timeLogService';
import {
  filterLastWeek,
  getHrsToday,
  getUser,
  groupByproject,
  isThisWeek,
  stringifyDate,
  totalWeekHours,
} from '../../utils';
import { DaysRemaining } from '../leave_screen/daysRemaining';
import Swipe from '../leave_screen/swipe';
import { QuotaPlaceHolder, UserPlaceHolder } from '../loader';
import { DaySelect } from './daySelect';
import { EmptyContainer, SmallHeader } from '../../common';
import { TimeLog } from './timelog';
import { RequestButton } from '../requestButton';
import Week from './week';

const TimeLogs = () => {
  const [refreshing, setRefreshing] = React.useState(false);
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState('');
  const { timelogs, dispatchTimeLog } = useContext(TimeLogContext);
  const [logs, setLogs] = useState([]);
  const ref = React.useRef(null);
  const [selectedHrs, setSelectedHrs] = useState(0);
  const [selectedDay, setSelectedDay] = useState('Today');
  const [thisWeekLogs, setThisWeekLogs] = useState([]);
  const [pastWeekLogs, setPastWeekLogs] = useState([]);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    setSelectedDay('Today');
    const user = await getUser();
    getAllTimeLogs(JSON.parse(user).id)
      .then((res) => {
        let thisw = res.filter((item) => isThisWeek(item));
        let pastw = res.filter((item) => !isThisWeek(item));

        dispatchTimeLog({
          type: 'CHANGE',
          payload: {
            present: thisw,
            past: pastw,
          },
        });
        setLoading(false);
        setRefreshing(false);
      })
      .catch((err) => console.log(err));
  }, []);

  const getTimeLogs = async () => {
    setLoading(true);
    setSelectedDay('Today');
    const user = await getUser();
    getAllTimeLogs(JSON.parse(user).id)
      .then((res) => {
        let thisw = res.filter((item) => isThisWeek(item));
        let pastw = res.filter((item) => !isThisWeek(item));

        dispatchTimeLog({
          type: 'CHANGE',
          payload: {
            present: thisw,
            past: pastw,
          },
        });
        setLoading(false);
        setRefreshing(false);
        setSelectedHrs(getHrsToday(thisw));
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getTimeLogs();
  }, []);

  useEffect(() => {
    setSelectedHrs(totalWeekHours(logs));
  }, [logs]);

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
    setThisWeekLogs(Object.entries(groupByproject(timelogs.present)));
    setPastWeekLogs(
      Object.entries(groupByproject(filterLastWeek(timelogs.past)))
    );
  }, [timelogs]);

  let row: Array<any> = [];

  useScrollToTop(ref);

  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        ref={ref}
        style={style.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {loading ? (
          <QuotaPlaceHolder />
        ) : (
          <View style={{ flexDirection: 'row' }}>
            <DaysRemaining
              total={8}
              remaining={Math.round(selectedHrs)}
              title={selectedDay.toUpperCase()}
              timelog={true}
            />
            <DaysRemaining
              total={40}
              remaining={Math.round(totalWeekHours(timelogs.present))}
              title={'THIS WEEK'}
              timelog={true}
            />
          </View>
        )}

        <SmallHeader text={'View'} />

        <DaySelect
          handleChange={(date) => {
            setDate(date);
            const logs = timelogs.past
              .concat(timelogs.present)
              .filter(
                (item) =>
                  new Date(item.log_date).toDateString() ===
                  new Date(date).toDateString()
              );
            setLogs(logs);
            setSelectedHrs(totalWeekHours(logs));
          }}
          refreshing={refreshing}
          setSelectedDay={setSelectedDay}
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
          !loading && <EmptyContainer text="You don't have logs this day." />
        )}
        <Week
          weekLogs={thisWeekLogs}
          loading={loading}
          refreshing={refreshing}
          title={'This Week'}
        />
        <Week
          weekLogs={pastWeekLogs}
          loading={loading}
          refreshing={refreshing}
          title={'Past Week'}
          last={true}
        />
      </ScrollView>
      <RequestButton
        screen="logtime"
        olddata={{
          log_date: stringifyDate(date),
          not_old: true,
        }}
      />
    </>
  );
};

export { TimeLogs };
