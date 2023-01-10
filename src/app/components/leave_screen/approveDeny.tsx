import React, { forwardRef, useImperativeHandle, useState } from "react";
import { View, Text } from "react-native";
import {
  Alert,
  button as Button,
  showToast,
  snackErrorBottom,
} from "../../common";
import { dataType } from "../../interface";
import { EditAlert } from "./responseAlert";
import { checkRequest } from "../../services";
import { goBack } from "../../utils/navigation";

interface approveDenyPropType {
  title: string;
  screenName?: string;
  style: object;
  item: dataType;
  fromStack: boolean;
  onPress: (action: string) => void;
  onPressSubmit: ({ note, action }: { note: string; action: string }) => void;
}

export const ApproveDeny = forwardRef(
  (
    {
      style,
      title,
      item,
      fromStack,
      screenName = "Leave",
      onPress,
      onPressSubmit,
    }: approveDenyPropType,
    ref: any
  ) => {
    const [show, setShow] = useState(false);
    const [isLoading, setisLoading] = useState(false);
    const { alertRef, actionRef } = ref;

    const hide = () => {
      setShow(false);
    };
    useImperativeHandle(
      actionRef,
      () => {
        return {
          show: () => setShow(true),
          hide,
          showLoading: () => setisLoading(true),
          hideLoading: () => setisLoading(false),
        };
      },
      []
    );

    return (
      <View>
        {show && (
          <EditAlert
            ref={alertRef}
            onPressSubmit={onPressSubmit}
            item={item}
            hide={hide}
            setShow={setShow}
            fromStack={fromStack}
            setisLoading={setisLoading}
            screenName={screenName}
          />
        )}
        {/* <Alert showAlert={showAlert} setShowAlert={setShowAlert}>
    This request just got deleted.
  </Alert> */}

        <Button onPress={() => onPress(title)} disabled={isLoading}>
          <View
            style={title === "Approve" ? style.buttonApprove : style.buttonDeny}
          >
            <Text style={title === "Approve" ? style.approve : style.deny}>
              {title}
            </Text>
          </View>
        </Button>
      </View>
    );
  }
);
