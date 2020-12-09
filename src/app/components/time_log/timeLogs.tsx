import { useScrollToTop } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import { View, FlatList, ScrollView, RefreshControl } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {
  myRequestsStyle as style,
  historyStyle,
  myRequestsStyle,
} from '../../../assets/styles';
import { TimeLogContext } from '../../reducer';
import { getAllTimeLogs } from '../../services/timeLogService';
import {
  getHrsToday,
  getUser,
  groupByproject,
  isThisWeek,
  totalWeekHours,
} from '../../utils';
import { DaysRemaining } from '../leave_screen/daysRemaining';
import Swipe from '../leave_screen/swipe';
import { QuotaPlaceHolder, UserPlaceHolder } from '../loader';
import { DaySelect } from './daySelect';
import { EmptyContainer, SmallHeader } from '../../common';
import { TimeLog } from './timelog';
import HistoryToggle from '../../common/historyToggle';

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
  const [toggle, setToggle] = useState('toggle-switch-off');

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    setToggle('toggle-switch-off');
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
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getTimeLogs();
  }, []);

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
    setSelectedHrs(getHrsToday(timelogs.present));
  }, [timelogs]);

  let row: Array<any> = [];

  useScrollToTop(ref);

  return (
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
            remaining={parseFloat(selectedHrs.toFixed(1))}
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
      <View style={myRequestsStyle.header}>
        <SmallHeader text="This Week" history={thisWeekLogs.length > 0} />
        {thisWeekLogs.length > 0 && (
          <HistoryToggle toggle={toggle} setToggle={setToggle} />
        )}
      </View>

      <View style={historyStyle.timelogcontainer}>
        {toggle === 'toggle-switch' ? (
          loading ? (
            <UserPlaceHolder />
          ) : thisWeekLogs[0] ? (
            thisWeekLogs.map((log) => <TimeLog item={log} thisweek={true} />)
          ) : (
            !thisWeekLogs[0] && (
              <EmptyContainer text="You don't have past logs." />
            )
          )
        ) : null}
      </View>
    </ScrollView>
  );
};

export { TimeLogs };
