import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import colors from '../../../assets/colors';
import {
  deleteAlertStyle,
  editAlertStyle,
  swipeStyle as style,
} from '../../../assets/styles';
import { AppIcon } from '../../common';
import { checkRequest } from '../../services';
import { DeleteAlert } from './deleteAlert';
import Dialog from 'react-native-dialog';

const Swipe = ({ item }: any) => {
  const navigation = useNavigation();
  const [showAlert, setShowAlert] = useState(false);
  const show = () => setShowAlert(true);
  const hide = () => setShowAlert(false);
  const onEdit = () => {
    checkRequest(item.id)
      .then((res) => {
        if (res === 'Pending') {
          navigation.navigate('requestLeave', item);
        } else {
          show();
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <View style={style.container}>
      {item.state !== 'In Progress' && (
        <>
          <TouchableOpacity
            onPress={() => onEdit()}
            style={deleteAlertStyle.iconContainer}
          >
            <AppIcon
              name="square-edit-outline"
              color={colors.primary}
              size={23}
            />
          </TouchableOpacity>
          <DeleteAlert item={item} />
        </>
      )}
      <Dialog.Container
        visible={showAlert}
        contentStyle={deleteAlertStyle.dialogContainer}
      >
        <View style={deleteAlertStyle.container}>
          <View style={deleteAlertStyle.main}>
            <Dialog.Title style={deleteAlertStyle.text1}>
              Your request just got reviewed.You cannot edit now
            </Dialog.Title>
          </View>
        </View>
        <View style={deleteAlertStyle.buttons}>
          <Dialog.Button
            label="OK"
            onPress={() => hide()}
            style={deleteAlertStyle.delete}
          />
        </View>
      </Dialog.Container>
    </View>
  );
};

export default Swipe;
