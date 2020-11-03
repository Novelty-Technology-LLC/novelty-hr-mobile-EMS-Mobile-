import React, { useContext, useEffect, useState } from 'react';
import { View, Text, FlatList, ScrollView, RefreshControl } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import colors from '../../../assets/colors';
import { myRequestsStyle as style, historyStyle } from '../../../assets/styles';
import { AppIcon } from '../../common';
import { TimeLogContext } from '../../reducer';
import { getAllTimeLogs } from '../../services/timeLogService';
import { getUser, isThisWeek, logMapper } from '../../utils';
import Swipe from '../leave_screen/swipe';
import { UserPlaceHolder } from '../loader';
import { RepeatTimeLog } from './repeatTimeLog';
import { TimeLog } from './timelog';

const TimeLogs = () => {
  const [toggle, setToggle] = useState('toggle-switch');
  const [refreshing, setRefreshing] = React.useState(false);
  const [loading, setLoading] = useState(true);
  const [repeatTimeLogs, setRepeatTimeLogs] = useState([]);
  const { timelogs, dispatchTimeLog } = useContext(TimeLogContext);

  const getTimeLogs = async () => {
    setLoading(true);
    const user = await getUser();
    getAllTimeLogs(JSON.parse(user).id)
      .then((res) => {
        setLoading(false);
        let thisw = res.filter((item) => isThisWeek(item));
        let pastw = res.filter((item) => !isThisWeek(item));
        setRepeatTimeLogs(logMapper(pastw));
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
      {repeatTimeLogs &&
        Object.entries(repeatTimeLogs).map(([key, value]) => (
          <RepeatTimeLog key={key} value={value} />
        ))}
      <View style={style.header}>
        <Text style={style.title}>This Week</Text>
        {timelogs.past.length > 0 && (
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
      {loading ? (
        <UserPlaceHolder />
      ) : timelogs.present[0] ? (
        <FlatList
          data={timelogs.present}
          renderItem={(item) => (
            <Swipeable
              renderRightActions={() => (
                <Swipe timelog={true} item={item.item} />
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
            <Text style={style.emptyText}>You don't have logs this week.</Text>
          </View>
        )
      )}

      <View style={historyStyle.timelogcontainer}>
        {toggle === 'toggle-switch' && (
          <View style={historyStyle.subcontainer}>
            <Text style={historyStyle.header}>Past Weeks</Text>
            <View style={historyStyle.line}></View>
          </View>
        )}
        {loading ? (
          <UserPlaceHolder />
        ) : toggle === 'toggle-switch' && timelogs.past[0] ? (
          <FlatList
            data={timelogs.past}
            renderItem={(item) => (
              <Swipeable
                renderRightActions={() => (
                  <Swipe timelog={true} item={item.item} />
                )}
              >
                <TimeLog item={item.item} />
              </Swipeable>
            )}
            keyExtractor={(item) => item.id}
          />
        ) : (
          !timelogs.past[0] && (
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
