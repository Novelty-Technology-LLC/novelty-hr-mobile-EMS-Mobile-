import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import colors from '../../../assets/colors';
import { deleteAlertStyle, swipeStyle as style } from '../../../assets/styles';
import { Alert, AppIcon } from '../../common';
import { checkRequest } from '../../services';
import { DeleteAlert } from './deleteAlert';
import { DeleteLog, EditLogAlert } from '../time_log';

const Swipe = ({ item, value, other, timelog, edittimelog, onPress }: any) => {
  const navigation = useNavigation();
  const [showAlert, setShowAlert] = useState(false);
  const show = () => setShowAlert(true);
  const hide = () => setShowAlert(false);
  const onEdit = () => {
    onPress();
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
    onPress();
    navigation.navigate('logtime', item);
  };

  return other ? (
    <View style={style.othercontainer}>
      {item.state === 'Approved' && (
        <>
          <DeleteAlert item={item} other={other} onPress={onPress} />
        </>
      )}
    </View>
  ) : timelog ? (
    <View style={style.container}>
      <DeleteAlert
        item={item}
        other={false}
        timelog={timelog}
        onPress={onPress}
      />
    </View>
  ) : edittimelog ? (
    <View style={style.tlcontainer}>
      <TouchableOpacity
        onPress={() => {
          onPress();
          show();
        }}
        style={deleteAlertStyle.iconContainer}
      >
        <AppIcon name="square-edit-outline" color={colors.primary} size={23} />
      </TouchableOpacity>
      <DeleteLog item={item} value={value} onPress={onPress} />
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
          <DeleteAlert item={item} onPress={onPress} />
        </View>
      ) : (
        <View style={style.othercontainer}>
          <DeleteAlert item={item} other={true} onPress={onPress} />
        </View>
      )}
      <Alert showAlert={showAlert} setShowAlert={setShowAlert}>
        Your request just got reviewed.You cannot edit now.
      </Alert>
    </>
  );
};

export default Swipe;
