import React, { useContext, useState } from 'react';
import { View } from 'react-native';
import Dialog from 'react-native-dialog';
import { deleteAlertStyle } from '../../../assets/styles';
import { Description } from '../request_screen';
import Time from './time';
import UUIDGenerator from 'react-native-uuid-generator';
import TaskContext from './taskContext';

const EditLogAlert = ({
  showAlert,
  setShowAlert,
  item,
  def,
}: {
  showAlert: boolean;
  setShowAlert: Function;
  item: object;
  def?: { id: string; time: number; task: string };
}) => {
  const [time, setTime] = useState(def ? def.time : 60);
  const [note, setNote] = useState(def ? def.task : '');
  const { tasks, setTasks } = useContext(TaskContext);

  const onSubmit = async (values) => {
    const uuid = await UUIDGenerator.getRandomUUID();
    values.id = uuid;
    let task;
    if (def) {
      task = [].concat(
        values,
        ...tasks.filter((val) => val.id !== def.id, values)
      );
    } else {
      task = [].concat(values, ...tasks);
    }
    setTasks(task);
    setShowAlert(false);
  };

  return (
    <Dialog.Container
      visible={showAlert}
      contentStyle={deleteAlertStyle.dialogContainer}
    >
      <Time handleChange={setTime} defaultValue={def && def.time} edit={true} />

      <Description
        handleChange={setNote}
        editlog={true}
        timelog={true}
        defaultValue={def && def.task}
      />

      <View style={deleteAlertStyle.buttons}>
        <Dialog.Button
          label="CANCEL"
          onPress={() => setShowAlert(false)}
          style={deleteAlertStyle.cancel}
        />
        <Dialog.Button
          label={def ? 'UPDATE' : 'ADD'}
          onPress={() => onSubmit({ task: note, time })}
          style={deleteAlertStyle.delete}
        />
      </View>
    </Dialog.Container>
  );
};

export { EditLogAlert };
