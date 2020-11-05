import React, { useContext, useState } from 'react';
import { View } from 'react-native';
import Dialog from 'react-native-dialog';
import { deleteAlertStyle } from '../../../assets/styles';
import { snackBarMessage } from '../../common';
import { TimeLogContext } from '../../reducer';
import { isThisWeek } from '../../utils';
import { Description } from '../request_screen';
import Time from './time';
import UUIDGenerator from 'react-native-uuid-generator';

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
  const { dispatchTimeLog } = useContext(TimeLogContext);

  const onSubmit = async (values) => {
    const uuid = await UUIDGenerator.getRandomUUID();
    values.id = uuid;
    if (def) {
      item.note = [].concat(
        values,
        ...item.note.filter((val) => val.id !== def.id, values)
      );
    } else {
      item.note = [].concat(values, ...item.note);
    }
    setShowAlert(false);
    dispatchTimeLog({
      type: 'EDIT',
      payload: {
        present: isThisWeek(item) ? item : null,
        past: isThisWeek(item) ? null : item,
      },
    });
    snackBarMessage(`task ${def ? 'updated' : 'added'}`);
  };

  return (
    <Dialog.Container
      visible={showAlert}
      contentStyle={deleteAlertStyle.dialogContainer}
    >
      <Time handleChange={setTime} defaultValue={def && def.time} />

      <Description
        handleChange={setNote}
        editlog={true}
        timelog={true}
        defaultValue={def && def.task}
      />

      <View style={deleteAlertStyle.buttons}>
        <Dialog.Button
          label={def ? 'UPDATE' : 'ADD'}
          onPress={() => onSubmit({ task: note, time })}
          style={deleteAlertStyle.delete}
        />
        <Dialog.Button
          label="CANCEL"
          onPress={() => setShowAlert(false)}
          style={deleteAlertStyle.cancel}
        />
      </View>
    </Dialog.Container>
  );
};

export { EditLogAlert };
