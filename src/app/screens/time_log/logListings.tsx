import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { header as Header } from '../../common';
import {
  leaveType as style,
  headerText,
  requestLeave,
} from '../../../assets/styles';
import colors from '../../../assets/colors';
import { momentdate } from '../../utils';
import { Tasks } from '../../components/time_log';
import TaskContext from '../../components/time_log/taskContext';
import { RequestButton } from '../../components/requestButton';

const LogListings = ({ route }: any) => {
  const olddata = route.params;
  const [tasks, setTasks] = useState(olddata ? olddata.note : []);
  return (
    <TaskContext.Provider value={{ tasks, setTasks }}>
      <View style={requestLeave.container}>
        <Header icon={true}>
          <Text style={headerText}>{olddata[0] ? olddata[0] : 'Log Time'}</Text>
        </Header>
        {!olddata[0] && (
          <View style={style.container}>
            <View style={style.padNone}>
              <View style={style.editdate}>
                <Text style={style.text}>
                  Project :{' '}
                  <Text style={{ color: colors.primary }}>
                    {olddata[0] ? olddata[0] : olddata.project.name}
                  </Text>
                </Text>
                <Text style={style.text}>
                  {momentdate(olddata.log_date, 'll')}
                </Text>
              </View>
            </View>
          </View>
        )}
        {olddata[0] ? (
          olddata[1].map((item) => <Tasks value={item} note={item.note} />)
        ) : (
          <Tasks value={olddata} />
        )}
        {olddata && (
          <RequestButton
            screen="logtime"
            addToList={true}
            olddata={{
              id: olddata[0] ? null : olddata.id,
              log_date: olddata[0] ? null : olddata.log_date,
              project: olddata[0] ? olddata[1][0].project : olddata.project,
            }}
          />
        )}
      </View>
    </TaskContext.Provider>
  );
};

export { LogListings };
