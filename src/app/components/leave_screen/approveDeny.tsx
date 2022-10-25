import React, { useState } from "react";
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
      {show && (
        <EditAlert
          item={item}
          status={title}
          setShow={setShow}
          setisLoading={setisLoading}
        />
      )}
      <Alert showAlert={showAlert} setShowAlert={setShowAlert}>
        This request just got deleted.
      </Alert>

      <Button
        onPress={() => {
          setisLoading(true);
          checkRequest(item?.id)
            .then((res) => {
              if (res === "Pending" || res === "In Progress") {
                setShow(true);
              } else {
                showToast(`Request got ${res}`, false);
              }
              setisLoading(false);
            })
            .catch((err) => setShowAlert(true));
        }}
        disabled={isLoading}
      >
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
};

export { ApproveDeny };
