import React, { useContext, useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import normalize from 'react-native-normalize';
import { ConfirmDialog } from 'react-native-simple-dialogs';
import colors from '../../../assets/colors';
import {
  deleteAlertStyle,
  deleteAlertStyle as style,
} from '../../../assets/styles';
import { AppIcon, snackBarMessage } from '../../common';
import { dataType } from '../../interface';
import { TimeLogContext } from '../../reducer';
import { deleteTimeLog, editTimeLog } from '../../services/timeLogService';
import { isThisWeek, totalHours } from '../../utils';
import { navigate } from '../../utils/navigation';
import TaskContext from './taskContext';

const DeleteLog = ({
  item,
  value,
  onPress,
}: {
  item: dataType;
  value: object;
  onPress: Function;
}) => {
  const [showAlert, setShowAlert] = useState(false);
  const show = () => setShowAlert(true);
  const hide = () => setShowAlert(false);
  const { tasks, setTasks } = useContext(TaskContext);
  const { dispatchTimeLog } = useContext(TimeLogContext);

  const onTaskDelete = () => {
    if (tasks.length > 1) {
      let task = tasks.filter((val) => val.id !== item.id);
      let values = {
        duration: totalHours({ note: task }),
        log_date: value.log_date,
        note: task,
        project_id: value.project_id,
        user_id: value.user_id,
      };
      setShowAlert(false);
      editTimeLog(value.id, values)
        .then((data) => {
          dispatchTimeLog({
            type: 'EDIT',
            payload: {
              present: isThisWeek(data) ? data : null,
              past: isThisWeek(data) ? null : data,
            },
          });
          setTasks(task);
          snackBarMessage(`Task deleted`);
        })
        .catch((err) => console.log(err));
    } else {
      deleteTimeLog(value.id)
        .then(() => {
          navigate('timelog');
          dispatchTimeLog({ type: 'DELETE', payload: value.id });
          snackBarMessage('TimeLog deleted');
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <>
      <TouchableOpacity
        onPress={() => {
          show();
          onPress();
        }}
        style={style.iconContainer}
      >
        <AppIcon name="delete" color={colors.tomato} size={23} />
      </TouchableOpacity>
      <ConfirmDialog
        visible={showAlert}
        onTouchOutside={() => setShowAlert(false)}
        contentStyle={[
          deleteAlertStyle.innercontent,
          { marginBottom: normalize(-30) },
        ]}
        titleStyle={deleteAlertStyle.text1}
        positiveButton={{
          titleStyle: deleteAlertStyle.delete,
          title: 'DELETE',
          onPress: () => {
            onTaskDelete();
            hide();
          },
        }}
        negativeButton={{
          titleStyle: deleteAlertStyle.cancel,
          title: 'CANCEl',
          onPress: () => hide(),
        }}
      >
        <View style={style.container}>
          <AppIcon name="alert" color={colors.tomato} size={30} />
          <View style={style.main}>
            <Text style={style.text1}>Delete the task ?</Text>
            <Text style={style.text2}>This cant be undone</Text>
          </View>
        </View>
      </ConfirmDialog>
    </>
  );
};

export { DeleteLog };
