import React, { useState } from 'react';
import { View, Text } from 'react-native';
import Dialog from 'react-native-dialog';

import { editAlertStyle as style } from '../../../assets/styles';
import RequestWithImage from '../../components/leave_screen/requestWithImage';
import State from '../../components/leave_screen/state';
import Textarea from 'react-native-textarea';
import { AppIcon } from '../../common';

const EditAlert = ({ item, showAlert, setShowAlert }: any) => {
  const [note, setNote] = useState('');
  const hide = () => setShowAlert(false);

  const onSubmit = () => {};
  return (
    <View style={{ backgroundColor: '#fff' }}>
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
            <View style={style.state}>
              <State state={'Approved'} />
              <AppIcon name="check-circle" style={style.icon} size={15} />
            </View>
            <View style={style.spaceTop}></View>
            <View style={style.state}>
              <State state={'Denied'} />
              <AppIcon name="check-circle" size={15} style={style.icon} />
            </View>
          </View>
        </View>
        <View style={style.main}>
          <Text style={style.note}>You can attach a note if you want</Text>
          <Textarea
            containerStyle={style.textareaContainer}
            style={style.textArea}
            maxLength={250}
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
