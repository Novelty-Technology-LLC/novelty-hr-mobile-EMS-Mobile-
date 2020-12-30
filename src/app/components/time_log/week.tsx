import React, { useContext, useEffect, useState } from 'react';
import { View } from 'react-native';
import { historyStyle, myRequestsStyle } from '../../../assets/styles';
import { EmptyContainer, SmallHeader } from '../../common';
import HistoryToggle from '../../common/historyToggle';
import { UserPlaceHolder } from '../loader';
import { TimeLog } from './timelog';
import { myRequestsStyle as style } from '../../../assets/styles';
import { DropDown } from '../../common';
import { TimeLogContext } from '../../reducer';
import { getUser, groupBydate, groupByproject } from '../../utils';
import { getFilteredTimeLogs } from '../../services/timeLogService';
import { thisWeek } from '../../utils/dateFilter';

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
    if (timelogs.past.length === 0) setToggle('toggle-switch-off');
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

  const getLogs = async (filter: any) => {
    sethistoryLoading(true);
    try {
      const user: any = await getUser();
      const historyLogs: any = await getFilteredTimeLogs(
        JSON.parse(user).id,
        filter
      );
      if (historyLogs) {
        dispatchTimeLog({
          type: 'CHANGE',
          payload: {
            present: timelogs.present,
            past: [...historyLogs],
            historyDate: filter,
          },
        });
        sethistoryLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setToggle('toggle-switch-off');
  }, [refreshing]);

  const weekOptions = [
    { label: 'This week', value: 'This week', key: '1' },
    { label: 'Past week', value: 'Past week', key: '2' },
  ];
  const groupByOptions = [
    { label: 'Date', value: 'Date', key: '1' },
    { label: 'Project', value: 'Project', key: '2' },
  ];

  return (
    <>
      <View style={myRequestsStyle.header}>
        <SmallHeader timelog={true} text={title} history={true} />
        <HistoryToggle timelog={true} toggle={toggle} setToggle={setToggle} />
      </View>

      <View style={last ? historyStyle.timelogcontainer : null}>
        {loading ? (
          <UserPlaceHolder />
        ) : toggle === 'toggle-switch' ? (
          weeksLogs[0] ? (
            <>
              <View style={style.dropDownView}>
                <DropDown
                  options={weekOptions}
                  type="week"
                  week={week}
                  onChange={async (filter: any, val: any) => {
                    getLogs(filter);
                    setWeek(val);
                  }}
                />
                <View style={style.dropDown}></View>
                <DropDown
                  options={groupByOptions}
                  type="group"
                  group={groupby}
                  onChange={(val: string) => {
                    setGroupby(val);
                    if (val === 'Date') {
                      setWeeksLogs([
                        ...Object.entries(groupBydate(timelogs.past)),
                      ]);
                    } else {
                      setWeeksLogs([
                        ...Object.entries(groupByproject(timelogs.past)),
                      ]);
                    }
                  }}
                />
              </View>
              {historyLoading ? (
                <UserPlaceHolder />
              ) : (
                weeksLogs.map((log) => (
                  <TimeLog
                    key={log.id}
                    item={log}
                    thisweek={true}
                    groupby={groupby}
                  />
                ))
              )}
            </>
          ) : !weeksLogs[0] && historyLoading ? (
            <UserPlaceHolder />
          ) : (
            <EmptyContainer text="You don't have past logs." />
          )
        ) : null}
      </View>
    </>
  );
};

export default Week;
