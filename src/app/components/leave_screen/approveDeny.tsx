import React, { useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { Alert, button as Button, snackErrorBottom } from '../../common';
import { dataType } from '../../interface';
import { EditAlert } from './responseAlert';
import colors from '../../../assets/colors';
import { checkRequest } from '../../services';

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
      <Alert showAlert={showAlert} setShowAlert={setShowAlert}>
        This request just got deleted.
      </Alert>

      <Button
        onPress={() => {
          checkRequest(item.id)
            .then((res) => {
              if (res === 'Pending' || res === 'In Progress') {
                setShow(true);
              } else {
                snackErrorBottom({ message: `request got ${res}` });
              }
            })
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
