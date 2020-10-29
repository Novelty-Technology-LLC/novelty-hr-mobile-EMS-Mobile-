import React, { useContext, useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import Dialog from 'react-native-dialog';
import colors from '../../../assets/colors';
import { deleteAlertStyle as style } from '../../../assets/styles';
import { AppIcon, snackBarMessage } from '../../common';
import { dataType } from '../../interface';
import { RequestContext } from '../../reducer';
import { deleteRequest, cancelLeave } from '../../services';
import { getUser } from '../../utils';

const DeleteAlert = ({ item, other }: { item: dataType; other: boolean }) => {
  const [showAlert, setShowAlert] = useState(false);
  const show = () => setShowAlert(true);
  const hide = () => setShowAlert(false);
  const { dispatchRequest } = useContext(RequestContext);

  const onDelete = async () => {
    const user = await getUser();
    other
      ? cancelLeave(item.id)
          .then((data) => {
            dispatchRequest({ type: 'UPDATEQUOTA', payload: data.quota });
            dispatchRequest({ type: 'CANCEL', payload: data.leave });
            snackBarMessage('Request Cancelled');
          })
          .catch((err) => console.log(err))
      : deleteRequest(item.id)
          .then(async (data) => {
            dispatchRequest({ type: 'UPDATEQUOTA', payload: data });
            dispatchRequest({ type: 'DELETE', payload: item.id });
            snackBarMessage('Request deleted');
          })
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
              {other ? 'Cancel' : 'Delete'} the request ?
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
              onDelete();
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
