import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Dialog from 'react-native-dialog';
import colors from '../../../assets/colors';
import {
  deleteAlertStyle,
  editAlertStyle as style,
} from '../../../assets/styles';
import RequestWithImage from './requestWithImage';
import State from './state';
import Textarea from 'react-native-textarea';
import { AppIcon } from '../../common';
import { dataType } from '../../interface';
import { updateRequest } from '../../services';
import { RequestContext } from '../../reducer';

const EditAlert = ({ item }: { item: dataType }) => {
  const [showAlert, setShowAlert] = useState(false);
  const [note, setNote] = useState('');
  const show = () => setShowAlert(true);
  const hide = () => setShowAlert(false);
  const { dispatchRequest } = useContext(RequestContext);

  const onSubmit = () => {
    const newData = { ...item, note: note };

    updateRequest(item.id, newData)
      .then((data) => {
        dispatchRequest({
          type: 'UPDATE',
          payload: { id: newData.id, data: newData },
        });
      })
      .catch((err) => console.log(err));
  };
  return (
    <View>
      <TouchableOpacity
        onPress={() => show()}
        style={deleteAlertStyle.iconContainer}
      >
        <AppIcon name="square-edit-outline" color={colors.primary} size={13} />
      </TouchableOpacity>
      <View style={style.spacer}></View>
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
            <State state={item.state} />
          </View>
        </View>
        <View style={style.main}>
          <Text style={style.note}>You can attach a note if you want</Text>
          <Textarea
            containerStyle={style.textareaContainer}
            style={style.textArea}
            maxLength={120}
            defaultValue={item.note}
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

export default EditAlert;
