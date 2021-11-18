import { useScrollToTop } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import { View, FlatList, ScrollView, RefreshControl, ActivityIndicator,Text } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { myRequestsStyle as style } from '../../../assets/styles';
import { AuthContext, TimeLogContext } from '../../reducer';
import { getFilteredTimeLogs } from '../../services/timeLogService';
import {
  getUser,
  initialState,
  isThisWeek,
  marking,
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
import { dateRange, todayDate } from '../../utils/dateFilter';
import Week from './week';
import normalize from 'react-native-normalize';
import { dashboardStyle as ds, headerTxtStyle } from '../../../assets/styles';
import { Header as HoursHeader, LineChartComponent } from '../../components';
import { thisWeek, getDay } from '../../utils/dateFilter';
import { getRequest } from '../../services';
import colors from '../../../assets/colors';


const data = (data: any) => {
  return {
    labels: data[0].day.map((item: any) => getDay(item)),
    datasets: [
      {
        data: data[3].threshold,
        strokeWidth: 2,
        color: () => `rgb(188, 188, 188)`,
      },
      {
        data: data[1].company_average,
        strokeWidth: 2,
        color: () => `rgb(191, 139, 89)`,
      },
      {
        data: data[2].your_log,
        strokeWidth: 2,
        color: () => `rgb(109,175,124)`,
      },
    ],
  };
};

const TimeLogs = () => {
  const [refreshing, setRefreshing] = React.useState(false);
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState<Date>(new Date());
  const { timelogs, dispatchTimeLog } = useContext(TimeLogContext);
  const [activeLoading, setActiveLoading] = useState(false);
  const ref = React.useRef(null);
  const [selectedHrs, setSelectedHrs] = useState(0);
  const [selectedDay, setSelectedDay] = useState('Today');
  const [initial, setinitial] = useState(true);
  const [logTime, setLogTime] = useState(thisWeek());
  const [loader, setLoader] = useState(false);
  const [totalTimeLog, setTotalTimeLog] = useState(initialState);
  const { state } = useContext(AuthContext);

  useEffect(() => {
    (async () => {
      if (state?.user?.id) {
        try {
          setLoader(true);

          let response: any = await getRequest('/dashboard/timelog', {
            ...logTime,
            user_id: state.user.id,
          },);

          response = response.filter((item: any) => item);
          const keys = Object.keys(response[0]).map((item) => {
            return {
              [item]: response.flatMap((val: any) =>
                val[item] > -1 ? [val[item] || 0] : []
              ),
            };
          });

          const mapData: any = keys.length ? data(keys) : initialState;

          setTotalTimeLog(mapData);
          setLoader(false);
        } catch (error) {
          setLoader(false);
        }
      }
    })();
  }, [state?.user?.id, logTime, refreshing]);


  const getInitialLogs = async () => {
    try {
      const user: any = await getUser();
      const activeLogs: any = await getFilteredTimeLogs(
        JSON.parse(user).id,
        todayDate()
      );
      if (activeLogs) {
        dispatchTimeLog({
          type: 'CHANGE',
          payload: {
            present: activeLogs,
            past: timelogs.past,
            reset: true,
            selectedDate: todayDate(),
          },
        });
        setLoading(false);
        setRefreshing(false);
        setActiveLoading(false);
        setinitial(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onSelect = React.useCallback(
    async (startDate?: string, endDate?: string) => {
      const selectedDate = !endDate ? dateRange(startDate, startDate) : null;
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
              selectedDate,
            },
          });
          setLoading(false);
          setRefreshing(false);
          setActiveLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    },
    []
  );

  useEffect(() => {
    setSelectedHrs(totalWeekHours(timelogs.present));
  }, [timelogs.present]);

  useEffect(() => {
    !initial && setActiveLoading(true);
    !initial && onSelect(stringifyDate(date));
  }, [date]);

  useEffect(() => {
    setActiveLoading(true);
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
              setinitial(true);
              setRefreshing(true);
              getInitialLogs();
            }}
          />
        }
      >
        {loading ? (
          <QuotaPlaceHolder />
        ) : (
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <DaysRemaining
              total={8}
              remaining={Math.round(selectedHrs)}
              title={selectedDay.toUpperCase()}
              timelog={true}
            />
            {timelogs.past[0] && (
              <DaysRemaining
                total={40}
                remaining={Math.round(totalWeekHours(timelogs.past))}
                title={isThisWeek(timelogs.past[0]) ? 'THIS WEEK' : 'PAST WEEK'}
                timelog={true}
              />
            )}
          </View>
        )}
        <SmallHeader text={'View'} />
        <DaySelect
          handleChange={(date: Date) => {
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
            style={{ marginTop: normalize(5) }}
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
            <EmptyContainer text="You don't have logs this day." containerStyle={{ 'marginTop': normalize(6) }} />
          )
        )}
        <Week loading={loading} refreshing={refreshing} title={'History'} />
        <View style={ds.timeLog}>
          <HoursHeader
            title="HOURS WORKED"
            dropDown={!refreshing && !loading}
            setLogTime={setLogTime}
          />
          <View style={ds.marking}>
            {marking.map((item, index) => (
              <View style={ds.markingBody} key={`${index}`}>
                <View
                  style={[
                    ds.border,
                    {
                      borderColor: item.color,
                      borderStyle: 'solid',
                      backgroundColor: item.color,
                    },
                  ]}
                />
                <View style={ds.markingGap} />
                <Text>{item.label}</Text>
              </View>
            ))}
          </View>
          <View style={ds.chartWrapper}>
            {loader ? (
              <View style={ds.loader}>
                <ActivityIndicator size="large" color={colors.primary} />
              </View>
            ) : (
              <LineChartComponent
                data={totalTimeLog}
                days={totalTimeLog.labels.length}
              />
            )}
          </View>
        </View>
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
