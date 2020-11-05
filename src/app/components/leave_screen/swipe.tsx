import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import colors from '../../../assets/colors';
import { deleteAlertStyle, swipeStyle as style } from '../../../assets/styles';
import { Alert, AppIcon } from '../../common';
import { checkRequest } from '../../services';
import { DeleteAlert } from './deleteAlert';
import { EditLogAlert } from '../time_log';

const Swipe = ({ item, value, other, timelog, edittimelog }: any) => {
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

  const onLogEdit = () => {
    navigation.navigate('logtime', item);
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
    <View style={style.container}>
      <TouchableOpacity
        onPress={() => onLogEdit()}
        style={deleteAlertStyle.iconContainer}
      >
        <AppIcon name="square-edit-outline" color={colors.primary} size={23} />
      </TouchableOpacity>
      <DeleteAlert item={item} other={false} timelog={timelog} />
    </View>
  ) : edittimelog ? (
    <View style={style.tlcontainer}>
      <TouchableOpacity
        onPress={() => {
          show();
        }}
        style={deleteAlertStyle.iconContainer}
      >
        <AppIcon name="square-edit-outline" color={colors.primary} size={23} />
      </TouchableOpacity>
      <DeleteAlert
        item={item}
        edittimelog={edittimelog}
        other={false}
        value={value}
      />
      <EditLogAlert
        showAlert={showAlert}
        setShowAlert={setShowAlert}
        def={item}
        item={value}
      />
    </View>
  ) : (
    <>
      {item.state !== 'In Progress' ? (
        <View style={style.container}>
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
        </View>
      ) : (
        <View style={style.othercontainer}>
          <DeleteAlert item={item} other={true} />
        </View>
      )}
      <Alert showAlert={showAlert} setShowAlert={setShowAlert}>
        Your request just got reviewed.You cannot edit now.
      </Alert>
    </>
  );
};

export default Swipe;
