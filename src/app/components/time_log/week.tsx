import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { historyStyle, myRequestsStyle } from '../../../assets/styles';
import { EmptyContainer, SmallHeader } from '../../common';
import HistoryToggle from '../../common/historyToggle';
import { UserPlaceHolder } from '../loader';
import { TimeLog } from './timelog';

const Week = ({
  weekLogs,
  loading,
  refreshing,
  title,
  last,
}: {
  weekLogs: Array<Object>;
  loading: boolean;
  refreshing: boolean;
  title: string;
  last?: boolean;
}) => {
  const [toggle, setToggle] = useState('toggle-switch-off');

  useEffect(() => {
    setToggle('toggle-switch-off');
  }, [refreshing]);

  return (
    <>
      <View style={myRequestsStyle.header}>
        <SmallHeader text={title} history={weekLogs.length > 0} />
        {weekLogs.length > 0 && (
          <HistoryToggle toggle={toggle} setToggle={setToggle} />
        )}
      </View>

      <View style={last ? historyStyle.timelogcontainer : null}>
        {loading ? (
          <UserPlaceHolder />
        ) : toggle === 'toggle-switch' ? (
          weekLogs[0] ? (
            weekLogs.map((log) => <TimeLog item={log} thisweek={true} />)
          ) : (
            !weekLogs[0] && <EmptyContainer text="You don't have past logs." />
          )
        ) : null}
      </View>
    </>
  );
};

export default Week;
