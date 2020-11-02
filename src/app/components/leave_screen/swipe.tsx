import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import colors from '../../../assets/colors';
import { deleteAlertStyle, swipeStyle as style } from '../../../assets/styles';
import { Alert, AppIcon } from '../../common';
import { checkRequest } from '../../services';
import { DeleteAlert } from './deleteAlert';

const Swipe = ({ item, other, timelog }: any) => {
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

  return other ? (
    <View style={style.othercontainer}>
      {item.state === 'Approved' && (
        <>
          <DeleteAlert item={item} other={other} />
        </>
      )}
    </View>
  ) : timelog ? (
    <>
      <TouchableOpacity
        onPress={() => onEdit()}
        style={deleteAlertStyle.iconContainer}
      >
        <AppIcon name="square-edit-outline" color={colors.primary} size={23} />
      </TouchableOpacity>
      {/* <DeleteAlert timelog={timelog} /> */}
    </>
  ) : (
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
      <Alert showAlert={showAlert} setShowAlert={setShowAlert}>
        Your request just got reviewed.You cannot edit now.
      </Alert>
    </View>
  );
};

export default Swipe;
