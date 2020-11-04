import React, { useState } from 'react';
import { View } from 'react-native';
import Dialog from 'react-native-dialog';
import { deleteAlertStyle } from '../../../assets/styles';
import { Description } from '../request_screen';
import Time from './time';

const EditLogAlert = ({
  showAlert,
  setShowAlert,
  item,
}: {
  showAlert: boolean;
  setShowAlert: Function;
  item: object;
}) => {
  const [time, setTime] = useState(item.duration);
  const [note, setNote] = useState(item.note);

  return (
    <Dialog.Container
      visible={showAlert}
      contentStyle={deleteAlertStyle.dialogContainer}
    >
      <Time handleChange={setTime} defaultValue={item.duration} />

      <Description
        handleChange={setNote}
        editlog={true}
        timelog={true}
        defaultValue={item.note}
      />

      <View style={deleteAlertStyle.buttons}>
        <Dialog.Button
          label="UPDATE"
          onPress={() => console.log({ time, note })}
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
