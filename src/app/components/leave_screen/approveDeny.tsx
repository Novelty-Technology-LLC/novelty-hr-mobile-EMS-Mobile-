import React, { useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { button as Button } from '../../common';
import { dataType } from '../../interface';
import { EditAlert } from './responseAlert';
import colors from '../../../assets/colors';
import { checkRequest } from '../../services';
import Dialog from 'react-native-dialog';
import { deleteAlertStyle } from '../../../assets/styles';

interface approveDenyPropType {
  title: string;
  style: object;
  item: dataType;
}

const ApproveDeny = ({ style, title, item }: approveDenyPropType) => {
  const [show, setShow] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  return (
    <View>
      {show && <EditAlert item={item} status={title} setShow={setShow} />}
      <Dialog.Container
        visible={showAlert}
        contentStyle={deleteAlertStyle.dialogContainer}
      >
        <View style={deleteAlertStyle.container}>
          <View style={deleteAlertStyle.main}>
            <Dialog.Title style={deleteAlertStyle.text1}>
              This request just got deleted.
            </Dialog.Title>
          </View>
        </View>
        <View style={deleteAlertStyle.buttons}>
          <Dialog.Button
            label="OK"
            onPress={() => setShowAlert(false)}
            style={deleteAlertStyle.delete}
          />
        </View>
      </Dialog.Container>

      <Button
        onPress={() => {
          checkRequest(item.id)
            .then((res) => setShow(true))
            .catch((err) => setShowAlert(true));
        }}
      >
        <View
          style={title === 'Approve' ? style.buttonApprove : style.buttonDeny}
        >
          <Text style={title === 'Approve' ? style.approve : style.deny}>
            {title}
          </Text>
          {isLoading && (
            <ActivityIndicator
              size={30}
              color={title === 'Approve' ? colors.white : colors.primary}
            />
          )}
        </View>
      </Button>
    </View>
  );
};

export { ApproveDeny };
