import React, { useContext, useState } from 'react';
import { View, Text } from 'react-native';
import Dialog from 'react-native-dialog';
import { editAlertStyle as style, requestStyle } from '../../../assets/styles';
import RequestWithImage from './requestWithImage';
import Textarea from 'react-native-textarea';
import { dataType } from '../../interface';
import { AppIcon, snackBarMessage } from '../../common';
import { useNavigation } from '@react-navigation/native';
import colors from '../../../assets/colors';
import { AdminRequestContext, AuthContext } from '../../reducer';
import { updateRequest } from '../../services';

const EditAlert = ({
  item,
  status,
  setShow,
  setisLoading,
}: {
  item: dataType;
  status: string;
  setShow: Function;
  setisLoading: Function;
}) => {
  const navigation = useNavigation();
  const [showAlert, setShowAlert] = useState(true);
  let [action, setAction] = useState(status);
  const [note, setNote] = useState('');
  const show = () => setShowAlert(true);
  const hide = () => {
    setShowAlert(false);
    setShow(false);
  };

  const { state } = useContext(AuthContext);
  const { dispatchAdmin } = useContext(AdminRequestContext);

  const onSubmit = async () => {
    action === 'Approve' && (action = 'Approved');
    action === 'Deny' && (action = 'Denied');

    const newData = {
      leave_id: item.id,
      action,
      note,
      requested_to: state.user.id,
      quotaId: item.sender,
      notification_token: item.user.notification_token,
      lead_name: state.user.first_name,
      user_name: item.user.first_name,
      uuid: state.user.uuid,
    };
    setisLoading(true);
    updateRequest(item.id, newData).then((data) => {
      item.state = data.status;
      dispatchAdmin({
        type: 'REPLY',
        payload: item,
      });
      navigation.navigate('leaveList');
      setisLoading(true);
      snackBarMessage('Request replied');
    });
  };

  return (
    <View>
      <Dialog.Container
        visible={showAlert}
        contentStyle={style.dialogContainer}
      >
        <View style={style.titleView}>
          <Dialog.Title style={style.title}>
            Your response is ready to go
          </Dialog.Title>
        </View>
        <View style={style.row}>
          <RequestWithImage item={item} />
          <View style={style.gap}></View>
          <View style={style.stateView}>
            <View style={requestStyle.rowAlign}>
              {action === 'Approve' && (
                <AppIcon
                  name="check-circle"
                  size={15}
                  color={colors.green}
                ></AppIcon>
              )}
              <Text
                style={requestStyle.state}
                onPress={() => setAction('Approve')}
              >
                Approve
              </Text>
            </View>
            <View style={style.semigap}></View>
            <View style={requestStyle.rowAlign}>
              {action === 'Deny' && (
                <AppIcon
                  name="check-circle"
                  size={15}
                  color={colors.green}
                ></AppIcon>
              )}
              <Text
                style={requestStyle.state}
                onPress={() => setAction('Deny')}
              >
                Deny
              </Text>
            </View>
          </View>
        </View>
        <View style={style.main}>
          <Text style={style.note}>You can attach a note if you want</Text>
          <Textarea
            containerStyle={style.textareaContainer}
            style={style.textArea}
            maxLength={120}
            placeholder={'Write a short note for your response'}
            placeholderTextColor={'#c7c7c7'}
            underlineColorAndroid={'transparent'}
            onChangeText={(data: string) => setNote(data)}
          />
        </View>
        <View style={style.buttons}>
          <Dialog.Button label="CANCEL" onPress={hide} style={style.cancel} />
          <View style={style.buttonGap}></View>
          <Dialog.Button
            label="SUBMIT"
            onPress={() => {
              onSubmit();
              hide();
            }}
            style={style.delete}
          />
        </View>
      </Dialog.Container>
    </View>
  );
};

export { EditAlert };
