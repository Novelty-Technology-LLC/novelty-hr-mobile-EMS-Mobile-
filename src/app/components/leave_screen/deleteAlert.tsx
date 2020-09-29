import React, { useContext, useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import Dialog from 'react-native-dialog';
import colors from '../../../assets/colors';
import { deleteAlertStyle as style } from '../../../assets/styles';
import { AppIcon } from '../../common';
import { dataType } from '../../interface';
import { RequestContext } from '../../reducer';
import { deleteRequest } from '../../services';

const DeleteAlert = ({ item }: { item: dataType }) => {
  const [showAlert, setShowAlert] = useState(false);
  const show = () => setShowAlert(true);
  const hide = () => setShowAlert(false);
  const { dispatchRequest } = useContext(RequestContext);

  const onDelete = () => {
    deleteRequest(item.id)
      .then(() => dispatchRequest({ type: 'DELETE', payload: item.id }))
      .catch((err) => console.log(err));
  };

  return (
    <>
      <TouchableOpacity onPress={() => show()} style={style.iconContainer}>
        <AppIcon name="delete" color={colors.tomato} size={13} />
      </TouchableOpacity>
      <Dialog.Container
        visible={showAlert}
        contentStyle={style.dialogContainer}
      >
        <View style={style.container}>
          <AppIcon name="alert" color={colors.tomato} size={30} />
          <View style={style.main}>
            <Dialog.Title style={style.text1}>
              Delete the request ?
            </Dialog.Title>
            <Dialog.Title style={style.text2}>This cant be undone</Dialog.Title>
          </View>
        </View>
        <View style={style.buttons}>
          <Dialog.Button label="CANCEL" onPress={hide} style={style.cancel} />
          <Dialog.Button
            label="DELETE"
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
