import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { header as Header } from '../../common';
import {
  leaveType as style,
  requestLeave,
  historyStyle,
  headerTxtStyle,
} from '../../../assets/styles';
import colors from '../../../assets/colors';
import { momentdate } from '../../utils';
import { Tasks } from '../../components/time_log';
import TaskContext from '../../components/time_log/taskContext';
import { RequestButton } from '../../components/requestButton';

const LogListings = ({ route }: any) => {
  let olddata = route.params;
  const [tasks, setTasks] = useState(olddata ? olddata : []);

  return (
    <TaskContext.Provider value={{ tasks, setTasks }}>
      <Header icon={true}>
        <Text style={headerTxtStyle.headerText}>
          {olddata[0] ?? 'Log Time'}
        </Text>
      </Header>
      <ScrollView
        style={requestLeave.container}
        showsVerticalScrollIndicator={false}
      >
        {!olddata[0] && (
          <View style={style.container}>
            <View style={style.padNone}>
              <View style={style.editdate}>
                <Text style={style.text}>
                  Project:{' '}
                  <Text style={{ color: colors.primary }}>
                    {olddata[0] ?? olddata.project.name}
                  </Text>
                </Text>
                <Text style={style.text}>
                  {momentdate(olddata.log_date, 'll')}
                </Text>
              </View>
            </View>
          </View>
        )}
        {tasks[0] ? (
          tasks[1].map((item) => (
            <Tasks value={item} note={item.note} groupby={olddata.groupby} />
          ))
        ) : (
          <Tasks value={tasks} />
        )}
        <View style={historyStyle.timelogcontainer}></View>
      </ScrollView>

      {olddata && (
        <RequestButton
          screen="logtime"
          addToList={true}
          olddata={{
            id: olddata[0] ? null : olddata.id,
            log_date: olddata[0]
              ? olddata.groupby === 'Date'
                ? olddata[0]
                : null
              : olddata.log_date,
            project: olddata[0] ? olddata[1][0].project : olddata.project,
          }}
        />
      )}
    </TaskContext.Provider>
  );
};

export { LogListings };
