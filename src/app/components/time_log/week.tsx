import React, { useContext, useEffect, useState } from 'react';
import { View } from 'react-native';
import { historyStyle, myRequestsStyle } from '../../../assets/styles';
import { EmptyContainer, SmallHeader } from '../../common';
import HistoryToggle from '../../common/historyToggle';
import { UserPlaceHolder } from '../loader';
import { TimeLog } from './timelog';
import { TimeLogContext } from '../../reducer';
import { getUser, groupBydate, groupByproject } from '../../utils';
import { getFilteredTimeLogs } from '../../services/timeLogService';
import { thisWeek } from '../../utils/dateFilter';
import DropDownView from './dropDown';

const Week = ({
  loading,
  refreshing,
  title,
  last,
}: {
  loading: boolean;
  refreshing: boolean;
  title: string;
  last?: boolean;
}) => {
  const { timelogs, dispatchTimeLog } = useContext(TimeLogContext);
  const [toggle, setToggle] = useState('toggle-switch-off');
  const [historyLoading, sethistoryLoading] = useState(false);
  const [weeksLogs, setWeeksLogs] = useState<any>(
    Object.entries(groupByproject([...timelogs.past]))
  );
  const [groupby, setGroupby] = useState('Project');
  const [week, setWeek] = useState('This Week');

  useEffect(() => {
    setWeeksLogs(
      Object.entries(
        groupby === 'Project'
          ? groupByproject([...timelogs.past])
          : groupBydate([...timelogs.past])
      )
    );
  }, [timelogs.past]);

  useEffect(() => {
    if (toggle === 'toggle-switch' && !timelogs.past[0]) {
      getLogs(thisWeek());
    } else if (toggle === 'toggle-switch-off') {
      dispatchTimeLog({
        type: 'RESET',
      });
    }
  }, [toggle]);

  const getLogs = async (filter: any, past?: boolean) => {
    sethistoryLoading(true);
    try {
      const user: any = await getUser();
      const historyLogs: any = await getFilteredTimeLogs(
        JSON.parse(user).id,
        filter
      );
      if (historyLogs) {
        if (past) {
          dispatchTimeLog({
            type: 'SET_PAST',
            payload: {
              past: [...historyLogs],
              historyDate: filter,
            },
          });
        } else {
          dispatchTimeLog({
            type: 'CHANGE',
            payload: {
              present: timelogs.present,
              past: [...historyLogs],
              historyDate: filter,
            },
          });
        }

        sethistoryLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setToggle('toggle-switch-off');
  }, [refreshing]);

  return (
    <>
      <View style={myRequestsStyle.header}>
        <SmallHeader timelog={true} text={title} history={true} />
        <HistoryToggle
          timelog={true}
          toggle={toggle}
          setToggle={setToggle}
          screen="timelog"
        />
      </View>
      <View style={last ? historyStyle.timelogcontainer : null}>
        {loading ? (
          <UserPlaceHolder />
        ) : toggle === 'toggle-switch' ? (
          <>
            {weeksLogs[0] ? (
              <>
                {historyLoading ? (
                  <UserPlaceHolder />
                ) : (
                  <>
                    <DropDownView
                      getLogs={getLogs}
                      setWeeksLogs={setWeeksLogs}
                      groupby={groupby}
                      setGroupby={setGroupby}
                      week={week}
                      setWeek={setWeek}
                    />

                    {weeksLogs.map((log: any) => (
                      <TimeLog
                        key={log[1][0].id}
                        item={log}
                        thisweek={true}
                        groupby={groupby}
                      />
                    ))}
                  </>
                )}
              </>
            ) : !weeksLogs[0] && historyLoading ? (
              <UserPlaceHolder />
            ) : (
              <>
                <DropDownView
                  getLogs={getLogs}
                  setWeeksLogs={setWeeksLogs}
                  groupby={groupby}
                  setGroupby={setGroupby}
                  week={week}
                  setWeek={setWeek}
                />
                <EmptyContainer text="You don't have past logs." />
              </>
            )}
          </>
        ) : null}
      </View>
    </>
  );
};

export default Week;
