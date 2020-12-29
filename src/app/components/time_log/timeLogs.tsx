import { useScrollToTop } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import { View, FlatList, ScrollView, RefreshControl } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { myRequestsStyle as style } from '../../../assets/styles';
import { TimeLogContext } from '../../reducer';
import {
  getAllTimeLogs,
  getFilteredTimeLogs,
} from '../../services/timeLogService';
import {
  filterLastWeek,
  getHrsToday,
  getUser,
  groupBydate,
  groupByproject,
  isThisWeek,
  stringifyDate,
  totalWeekHours,
} from '../../utils';
import { DaysRemaining } from '../leave_screen/daysRemaining';
import Swipe from '../leave_screen/swipe';
import { QuotaPlaceHolder, UserPlaceHolder } from '../loader';
import { DaySelect } from './daySelect';
import { EmptyContainer, SmallHeader, DropDown } from '../../common';
import { TimeLog } from './timelog';
import { RequestButton } from '../requestButton';
import Week from './week';
import { dateRange, thisWeek, todayDate } from '../../utils/dateFilter';

const weekOptions = [
  { label: 'This week', value: 'This week', key: '1' },
  { label: 'Past week', value: 'Past week', key: '2' },
];
const groupByOptions = [
  { label: 'Date', value: 'Date', key: '1' },
  { label: 'Project', value: 'Project', key: '2' },
];

const TimeLogs = () => {
  const [refreshing, setRefreshing] = React.useState(false);
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState('');
  const { timelogs, dispatchTimeLog } = useContext(TimeLogContext);
  const [activeLoading, setActiveLoading] = useState(false);
  const ref = React.useRef(null);
  const [selectedHrs, setSelectedHrs] = useState(0);
  const [selectedDay, setSelectedDay] = useState('Today');
  const [thisWeekHrs, setThisWeekHrs] = useState(0);
  // const [thisWeekLogs, setThisWeekLogs] = useState([]);
  // const [pastWeekLogs, setPastWeekLogs] = useState([]);
  const [initial, setinitial] = useState(true);
  const getInitialLogs = async () => {
    try {
      const user: any = await getUser();
      const historyLogs: any = await getFilteredTimeLogs(
        JSON.parse(user).id,
        thisWeek()
      );
      const activeLogs = historyLogs.filter(
        (item) =>
          new Date(item.log_date).toDateString() ===
          new Date(date === '' ? new Date() : date).toDateString()
      );
      if (activeLogs && historyLogs) {
        dispatchTimeLog({
          type: 'CHANGE',
          payload: {
            present: activeLogs,
            past: historyLogs,
          },
        });
        setLoading(false);
        setRefreshing(false);
        setSelectedHrs(totalWeekHours(activeLogs));
        setThisWeekHrs(totalWeekHours(historyLogs));
        setinitial(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onSelect = React.useCallback(
    async (startDate?: Date, endDate?: Date) => {
      const user: any = await getUser();

      try {
        const user: any = await getUser();
        const activeLogs: any = await getFilteredTimeLogs(
          JSON.parse(user).id,
          dateRange(startDate, endDate ? endDate : startDate)
        );
        if (activeLogs) {
          dispatchTimeLog({
            type: 'CHANGE',
            payload: {
              present: activeLogs,
              past: timelogs.past,
            },
          });
          setLoading(false);
          setRefreshing(false);
          setActiveLoading(false);
          setSelectedHrs(totalWeekHours(activeLogs));
        }
      } catch (error) {
        console.log(error);
      }
    },
    []
  );

  useEffect(() => {
    !initial && setActiveLoading(true);
    !initial && onSelect(date, null);
  }, [date]);

  useEffect(() => {
    getInitialLogs();
  }, []);

  let row: Array<any> = [];
  useScrollToTop(ref);

  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        ref={ref}
        style={style.container}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              setRefreshing(true);
              getInitialLogs();
            }}
          />
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
              remaining={Math.round(thisWeekHrs)}
              title={'THIS WEEK'}
              timelog={true}
            />
          </View>
        )}
        <SmallHeader text={'View'} />

        <DaySelect
          handleChange={(date) => {
            setDate(date);
          }}
          refreshing={refreshing}
          setSelectedDay={setSelectedDay}
        />

        {activeLoading ? (
          <UserPlaceHolder />
        ) : timelogs.present[0] ? (
          <FlatList
            data={timelogs.present}
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
          !activeLoading && (
            <EmptyContainer text="You don't have logs this day." />
          )
        )}
        <Week
          weekLogs={Object.entries(groupByproject(timelogs.past))}
          loading={loading}
          refreshing={refreshing}
          title={'history'}
          // groupby={'date'}
        />
        <View style={style.dropDownView}>
          <DropDown options={weekOptions} type="week" />
          <View style={style.dropDown}></View>
          <DropDown options={groupByOptions} type="group" />
        </View>
        {/*<Week
          weekLogs={pastWeekLogs}
          loading={loading}
          refreshing={refreshing}
          title={'Past Week'}
          last={true}
        /> */}
        <View style={{ marginBottom: 100 }}></View>
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
