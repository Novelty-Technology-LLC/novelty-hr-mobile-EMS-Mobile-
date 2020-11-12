import React, { useContext, useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import Dialog from 'react-native-dialog';
import colors from '../../../assets/colors';
import { deleteAlertStyle as style } from '../../../assets/styles';
import { AppIcon, snackBarMessage, snackErrorBottom } from '../../common';
import { dataType } from '../../interface';
import { RequestContext, TimeLogContext } from '../../reducer';
import { deleteRequest, cancelLeave } from '../../services';
import { deleteTimeLog } from '../../services/timeLogService';
import { getUser } from '../../utils';

const DeleteAlert = ({
  item,
  other,
  value,
  timelog,
  edittimelog,
  onPress,
}: {
  item: dataType;
  other: boolean;
  timelog?: boolean;
  value?: object;
  edittimelog?: boolean;
  onPress?: Function;
}) => {
  const [showAlert, setShowAlert] = useState(false);
  const show = () => setShowAlert(true);
  const hide = () => setShowAlert(false);
  const { dispatchTimeLog } = useContext(TimeLogContext);
  const { dispatchRequest } = useContext(RequestContext);
  const [loading, setLoading] = useState(false);

  const onDelete = async () => {
    const user = await getUser();
    setLoading(true);
    if (other) {
      if (new Date(item.leave_date.startDate) > new Date()) {
        cancelLeave(item.id)
          .then((data) => {
            dispatchRequest({ type: 'UPDATEQUOTA', payload: data.quota });
            dispatchRequest({ type: 'CANCEL', payload: data.leave });
            setLoading(false);
            snackBarMessage('Request Cancelled');
          })
          .catch((err) => console.log(err));
      } else {
        setLoading(false);
        snackErrorBottom({ message: 'You cannot cancel request now' });
      }
    } else {
      deleteRequest(item.id)
        .then(async (data) => {
          dispatchRequest({ type: 'UPDATEQUOTA', payload: data });
          dispatchRequest({ type: 'DELETE', payload: item.id });
          snackBarMessage('Request deleted');
          setLoading(false);
        })
        .catch((err) => console.log(err));
    }
  };

  const onTimeLogDelete = () => {
    deleteTimeLog(item.id)
      .then(() => {
        dispatchTimeLog({ type: 'DELETE', payload: item.id });
        snackBarMessage('TimeLog deleted');
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <TouchableOpacity
        onPress={() => {
          show();
          onPress && onPress();
        }}
        style={style.iconContainer}
        disabled={loading}
      >
        <AppIcon
          name={other ? 'close-circle' : 'delete'}
          color={colors.tomato}
          size={23}
        />
      </TouchableOpacity>
      <Dialog.Container
        visible={showAlert}
        contentStyle={style.dialogContainer}
      >
        <View style={style.container}>
          <AppIcon name="alert" color={colors.tomato} size={30} />
          <View style={style.main}>
            <Dialog.Title style={style.text1}>
              {other ? 'Cancel' : 'Delete'} the{' '}
              {edittimelog ? 'task ' : timelog ? 'timelog' : 'request'} ?
            </Dialog.Title>
            <Dialog.Title style={style.text2}>This cant be undone</Dialog.Title>
          </View>
        </View>
        <View style={style.buttons}>
          <Dialog.Button
            label={other ? 'NO' : 'CANCEL'}
            onPress={hide}
            style={style.cancel}
          />
          <Dialog.Button
            label={other ? 'YES' : 'DELETE'}
            onPress={() => {
              timelog ? onTimeLogDelete() : onDelete();
              hide();
            }}
            style={style.delete}
          />
        </View>
      </Dialog.Container>
    </>
  );
};

export { DeleteAlert };
