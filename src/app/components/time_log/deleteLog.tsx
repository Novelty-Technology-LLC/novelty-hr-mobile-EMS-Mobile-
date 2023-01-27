import React, { useContext, useState } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import normalize from "react-native-normalize";
import { ConfirmDialog } from "react-native-simple-dialogs";
import colors from "../../../assets/colors";
import {
  deleteAlertStyle,
  deleteAlertStyle as style,
} from "../../../assets/styles";
import { AppIcon, showToast, snackBarMessage } from "../../common";
import { dataType } from "../../interface";
import { TimeLogContext } from "../../reducer";
import { deleteTimeLog, editTimeLog } from "../../services/timeLogService";
import { checkAndReplace, totalHours } from "../../utils";
import { navigate } from "../../utils/navigation";
import Normalize from "../../utils/normalize";
import TaskContext from "./taskContext";

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
  const { timelogs, dispatchTimeLog } = useContext(TimeLogContext);

  const onTaskDelete = () => {
    let taskList = [];
    if (tasks[1]) {
      taskList = tasks[1].filter((task) => task.id === value.id)[0].note;
    } else {
      taskList = tasks.note;
    }

    if (taskList.length > 1) {
      let task = taskList.filter((val) => val.id !== item?.id);
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
          checkAndReplace(data, timelogs, dispatchTimeLog);
          if (tasks[1]) {
            tasks[1].filter((task) => task.id === value.id)[0].note = task;
            setTasks([...tasks]);
          } else {
            setTasks({ ...tasks, note: task });
          }
          showToast(`Task deleted 🗑️`);
        })
        .catch((err) => {});
    } else {
      deleteTimeLog(value.id)
        .then(() => {
          navigate("timelog");
          dispatchTimeLog({ type: "DELETE", payload: value.id });
          showToast("TimeLog deleted 🗑️");
        })
        .catch((err) => {});
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
        <AppIcon name='delete' color={colors.buttonRed} size={Normalize(16)} />
      </TouchableOpacity>
      <ConfirmDialog
        visible={showAlert}
        onTouchOutside={() => setShowAlert(false)}
        contentStyle={[deleteAlertStyle.innercontent, { marginBottom: 0 }]}
        dialogStyle={{ borderRadius: 5 }}
        titleStyle={deleteAlertStyle.text1}
        positiveButton={{
          titleStyle: deleteAlertStyle.delete,
          title: "DELETE",
          onPress: () => {
            onTaskDelete();
            hide();
          },
        }}
        negativeButton={{
          titleStyle: deleteAlertStyle.cancel,
          title: "CANCEL",
          onPress: () => hide(),
        }}
      >
        <View style={[style.container, { marginBottom: normalize(-20) }]}>
          <AppIcon name='alert' color={colors.buttonRed} size={30} />
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
