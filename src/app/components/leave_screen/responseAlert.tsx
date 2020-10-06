import React, { useContext, useState } from 'react';
import { View, Text } from 'react-native';
import Dialog from 'react-native-dialog';
import { editAlertStyle as style, requestStyle } from '../../../assets/styles';
import RequestWithImage from './requestWithImage';
import Textarea from 'react-native-textarea';
import { dataType } from '../../interface';
import { AppIcon } from '../../common';
import { useNavigation } from '@react-navigation/native';
import colors from '../../../assets/colors';
import { AuthContext } from '../../reducer';
import { updateRequest } from '../../services';

const EditAlert = ({ item, status }: { item: dataType; status: string }) => {
  const navigation = useNavigation();
  const [showAlert, setShowAlert] = useState(true);
  let [action, setAction] = useState(status);
  const [note, setNote] = useState('');
  const show = () => setShowAlert(true);
  const hide = () => setShowAlert(false);
  const { state } = useContext(AuthContext);

  const onSubmit = async () => {
    const Id = state.user.uuid;

    action === 'Approve' && (action = 'Approved');
    action === 'Deny' && (action = 'Denied');

    const newData = {
      leave_id: item.id,
      action,
      note,
      requested_to: Id,
    };
    updateRequest(item.id, newData);
    navigation.navigate('leaveList');
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
