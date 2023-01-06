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
import { goBack } from "../../utils/navigation";

interface approveDenyPropType {
  title: string;
  screenName: string;
  style: object;
  item: dataType;
  fromStack: boolean;
}

const ApproveDeny = ({
  style,
  title,
  item,
  fromStack,
  screenName = "Leave",
}: approveDenyPropType) => {
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
          fromStack={fromStack}
          setisLoading={setisLoading}
          screenName={screenName}
        />
      )}
      {/* <Alert showAlert={showAlert} setShowAlert={setShowAlert}>
        This request just got deleted.
      </Alert> */}

      <Button
        onPress={() => {
          console.log("sad asbdjk");

          setisLoading(true);
          checkRequest(item?.id)
            .then((res) => {
              console.log(res, "reseseseahsduab");

              if (res === "Pending" || res === "In Progress") {
                setShow(true);
              } else {
                setShow(true);

                // showToast(`Request got ${res}`, false);
              }
              setisLoading(false);
            })
            .catch((err) => {
              console.log();

              setisLoading(false);
              setShowAlert(true);
            });
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
