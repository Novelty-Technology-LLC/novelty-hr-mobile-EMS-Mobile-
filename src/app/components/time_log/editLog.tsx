import React, { useContext, useEffect, useState } from 'react';
import { Text, View } from 'react-native';
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
  const [error, setError] = useState(false);
  const { tasks, setTasks } = useContext(TaskContext);
  const [touched, setTouched] = useState(false);

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
    setNote('');
  };

  useEffect(() => {
    if (note === '') {
      setError(true);
    } else {
      setError(false);
    }
  }, [note]);

  return (
    <Dialog.Container
      visible={showAlert}
      contentStyle={deleteAlertStyle.dialogContainer}
    >
      <Time handleChange={setTime} defaultValue={def && def.time} edit={true} />

      <Description
        handleChange={(data) => {
          setTouched(true);
          setNote(data);
        }}
        editlog={true}
        timelog={true}
        defaultValue={def && def.task}
      />
      {error && touched && (
        <Text style={deleteAlertStyle.error}>task description is required</Text>
      )}

      <View style={deleteAlertStyle.buttons}>
        <Dialog.Button
          label="CANCEL"
          onPress={() => {
            setTouched(false);
            setShowAlert(false);
          }}
          style={deleteAlertStyle.cancel}
        />
        <Dialog.Button
          label={def ? 'UPDATE' : 'ADD'}
          onPress={() => {
            if (!error) {
              onSubmit({ task: note, time });
            } else {
              setTouched(true);
            }
          }}
          style={deleteAlertStyle.delete}
        />
      </View>
    </Dialog.Container>
  );
};

export { EditLogAlert };
