import React, { useContext, useState } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import normalize from "react-native-normalize";
import { ConfirmDialog } from "react-native-simple-dialogs";
import colors from "../../../assets/colors";
import { deleteAlertStyle as style } from "../../../assets/styles";
import { AppIcon, showToast, snackBarMessage } from "../../common";
import { dataType } from "../../interface";
import { RequestContext, TimeLogContext } from "../../reducer";
import { deleteRequest, cancelLeave } from "../../services";
import { deleteTimeLog } from "../../services/timeLogService";
import Normalize from "../../utils/normalize";

const DeleteAlert = ({
  item,
  other,
  value,
  timelog,
  edittimelog,
  onPress,
}: {
  item: dataType;
  other: boolean;
  timelog?: boolean;
  value?: object;
  edittimelog?: boolean;
  onPress?: Function;
}) => {
  const [showAlert, setShowAlert] = useState(false);
  const show = () => setShowAlert(true);
  const hide = () => setShowAlert(false);
  const { dispatchTimeLog } = useContext(TimeLogContext);
  const { dispatchRequest } = useContext(RequestContext);
  const [loading, setLoading] = useState(false);

  const onDelete = async () => {
    setLoading(true);
    if (other) {
      cancelLeave(item.id)
        .then((data) => {
          dispatchRequest({ type: "UPDATEQUOTA", payload: data.quota });
          dispatchRequest({ type: "CANCEL", payload: data.leave });
          setLoading(false);
          showToast("Request Cancelled");
        })
        .catch((err) => {});
    } else {
      deleteRequest(item.id)
        .then(async (data) => {
          dispatchRequest({ type: "UPDATEQUOTA", payload: data });
          dispatchRequest({ type: "DELETE", payload: item.id });
          showToast("Request deleted");
          setLoading(false);
        })
        .catch((err) => {});
    }
    hide();
  };

  const onTimeLogDelete = () => {
    deleteTimeLog(item.id)
      .then(() => {
        dispatchTimeLog({ type: "DELETE", payload: item.id });
        showToast("TimeLog deleted");
      })
      .catch((err) => {});
    hide();
  };
  const positive = other ? "YES" : "DELETE";
  const negative = other ? "NO" : "CANCEL";

  return (
    <>
      <TouchableOpacity
        onPress={() => {
          show();
          onPress && onPress();
        }}
        style={style.iconContainer}
        disabled={loading}
      >
        <AppIcon
          name={other ? "close-circle" : "delete"}
          color={colors.buttonRed}
          size={Normalize(20)}
        />
      </TouchableOpacity>
      <ConfirmDialog
        visible={showAlert}
        onTouchOutside={() => setShowAlert(false)}
        contentStyle={[style.innercontent, { marginBottom: 0 }]}
        dialogStyle={{ borderRadius: 5 }}
        titleStyle={style.text1}
        positiveButton={{
          titleStyle: style.delete,
          title: positive,
          onPress: () => {
            timelog ? onTimeLogDelete() : onDelete();
            hide();
          },
        }}
        negativeButton={{
          titleStyle: style.cancel,
          title: negative,
          onPress: () => hide(),
        }}
      >
        <View style={[style.container, { marginBottom: normalize(-20) }]}>
          <AppIcon name="alert" color={colors.buttonRed} size={30} />
          <View style={[style.main, { marginBottom: normalize(-15) }]}>
            <Text style={style.text1}>
              {other ? "Cancel" : "Delete"} the{" "}
              {edittimelog ? "task " : timelog ? "timelog" : "request"} ?
            </Text>
            <Text style={style.text2}>This can't be undone</Text>
          </View>
        </View>
      </ConfirmDialog>
    </>
  );
};

export { DeleteAlert };
