import React, { useContext, useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import Dialog from 'react-native-dialog';
import colors from '../../../assets/colors';
import { deleteAlertStyle as style } from '../../../assets/styles';
import { AppIcon, snackBarMessage, snackErrorBottom } from '../../common';
import { dataType } from '../../interface';
import { RequestContext } from '../../reducer';
import { deleteRequest, cancelLeave } from '../../services';
import { deleteTimeLog } from '../../services/timeLogService';
import { getUser } from '../../utils';

const DeleteAlert = ({
  item,
  other,
  timelog,
}: {
  item: dataType;
  other: boolean;
  timelog?: boolean;
}) => {
  const [showAlert, setShowAlert] = useState(false);
  const show = () => setShowAlert(true);
  const hide = () => setShowAlert(false);

  const onDelete = async () => {
    const user = await getUser();
    if (!timelog) {
      const { dispatchRequest } = useContext(RequestContext);
      if (other) {
        if (new Date(item.leave_date.startDate) > new Date()) {
          cancelLeave(item.id)
            .then((data) => {
              dispatchRequest({ type: 'UPDATEQUOTA', payload: data.quota });
              dispatchRequest({ type: 'CANCEL', payload: data.leave });
              snackBarMessage('Request Cancelled');
            })
            .catch((err) => console.log(err));
        } else {
          snackErrorBottom({ message: 'You cannot cancel request now' });
        }
      } else {
        deleteRequest(item.id)
          .then(async (data) => {
            dispatchRequest({ type: 'UPDATEQUOTA', payload: data });
            dispatchRequest({ type: 'DELETE', payload: item.id });
            snackBarMessage('Request deleted');
          })
          .catch((err) => console.log(err));
      }
    }
  };

  const onLogDelete = () => {
    deleteTimeLog(item.id)
      .then((data) => console.log('deleted', data))
      .catch((err) => console.log(err));
  };

  return (
    <>
      <TouchableOpacity onPress={() => show()} style={style.iconContainer}>
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
              {timelog
                ? 'Delete the timelog?'
                : (other ? 'Cancel' : 'Delete') + ' the request ?'}
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
              timelog ? onLogDelete() : onDelete();
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
