import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Dialog from 'react-native-dialog';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../../../assets/colors';
import { editAlertStyle as style } from '../../../assets/styles';
import RequestWithImage from './requestWithImage';
import State from './state';
import Textarea from 'react-native-textarea';

const EditAlert = ({ item }: any) => {
  const [showAlert, setShowAlert] = useState(false);
  const show = () => setShowAlert(true);
  const hide = () => setShowAlert(false);
  return (
    <View>
      <TouchableWithoutFeedback onPress={() => show()}>
        <Icon name="square-edit-outline" color={colors.yellow} size={15} />
      </TouchableWithoutFeedback>
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
          <State state={item.state} />
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
            // onChangeText={}
          />
        </View>
        <View style={style.buttons}>
          <Dialog.Button label="CANCEL" onPress={hide} style={style.cancel} />
          <View style={style.buttonGap}></View>
          <Dialog.Button label="SUBMIT" onPress={show} style={style.delete} />
        </View>
      </Dialog.Container>
    </View>
  );
};

export default EditAlert;
