import React, { useContext, useState } from "react";
import { View, TouchableOpacity, Text, ActivityIndicator } from "react-native";
import normalize from "react-native-normalize";
import { ConfirmDialog } from "react-native-simple-dialogs";
import colors from "../../../assets/colors";
import { deleteAlertStyle as style } from "../../../assets/styles";
import { AppIcon, showToast, snackBarMessage } from "../../common";
import { dataType } from "../../interface";
import { RequestWFHContext } from "../../reducer/requestWorkFromReducer";
import { cancelWfh, deleteWfhRequest } from "../../services";
import Normalize from "../../utils/normalize";

export const WFHDeleteAlert = ({
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
  const { requestsWFH, dispatchWFHRequest } =
    useContext<any>(RequestWFHContext);
  const [loading, setLoading] = useState(false);

  const onDelete = async () => {
    setLoading(true);
    if (other) {
      cancelWfh(item?.id)
        .then((data) => {
          dispatchWFHRequest({ type: "UPDATEQUOTA", payload: data.quota });
          dispatchWFHRequest({ type: "CANCEL", payload: data.home });
          setLoading(false);
          showToast("Request Cancelled ❌");
          hide();
        })
        .catch((err) => {
          hide();
        });
    } else {
      deleteWfhRequest(item.id)
        .then(async (data) => {
          dispatchWFHRequest({ type: "UPDATEQUOTA", payload: data });
          dispatchWFHRequest({ type: "DELETE", payload: item.id });
          showToast("Request deleted 🗑️");
          setLoading(false);
          hide();
        })
        .catch((err) => {
          hide();
        });
    }
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
          disabled: loading, // to be done later
          titleStyle: style.delete,
          title: positive,
          onPress: () => {
            onDelete();
          },
        }}
        negativeButton={{
          disabled: loading,
          titleStyle: style.cancel,
          title: negative,
          onPress: () => hide(),
        }}
      >
        <View style={[style.container, { marginBottom: normalize(-20) }]}>
          {loading && (
            <View
              style={{
                marginBottom: normalize(-20),
                position: "absolute",
                right: normalize(10),
              }}
            >
              <ActivityIndicator
                size={30}
                color={colors.primary}
                style={{ marginLeft: normalize(50) }}
              />
            </View>
          )}
          <AppIcon
            name='alert'
            color={loading ? colors.fontGrey : colors.buttonRed}
            size={30}
          />
          <View style={[style.main, { marginBottom: normalize(-15) }]}>
            <Text style={loading ? style.text1withOpacity : style.text1}>
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
