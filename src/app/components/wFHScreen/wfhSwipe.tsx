import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import colors from "../../../assets/colors";
import { deleteAlertStyle, swipeStyle as style } from "../../../assets/styles";
import { Alert, AppIcon } from "../../common";
import Normalize from "../../utils/normalize";
import moment from "moment";
import { dateStringMapper, momentdate } from "../../utils";
import { WFHDeleteAlert } from "./wfhDeleteAlert";

export const WFHSwipe = ({
  item,
  value,
  other,
  timelog,
  edittimelog,
  onPress,
  screenName = "",
  setLoading,
  isLeave,
}: any) => {
  const navigation = useNavigation();
  const [showAlert, setShowAlert] = useState(false);
  const show = () => setShowAlert(true);
  const hide = () => setShowAlert(false);

  const onEdit = () => {
    onPress();
    navigation.navigate(screenName, {
      ...item,
      date: {
        startDate: moment(item?.start_date.slice(0, 10)).format("llll"),
        endDate: moment(item?.end_date.slice(0, 10)).format("llll"),
      },
    });
  };

  const onLogEdit = () => {
    onPress();
    navigation.navigate("loglistings", item);
  };

  const checkLeaveDate = (date: any) => {
    const current_date = moment().format("YYYY-MM-DD");
    if (
      moment(current_date).isSame(momentdate(date?.startDate, "YYYY-MM-DD"))
    ) {
      return true;
    } else {
      return false;
    }
  };

  return other ? (
    <View style={style.othercontainer}>
      {item?.status === "Approved" && (
        <>
          <WFHDeleteAlert item={item} other={false} onPress={onPress} />
        </>
      )}
    </View>
  ) : (
    <>
      {item.status === "Pending" ? (
        <View style={style.container}>
          <TouchableOpacity
            onPress={() => onEdit()}
            style={deleteAlertStyle.iconContainer}
          >
            <AppIcon
              name='square-edit-outline'
              color={colors.primary}
              size={Normalize(20)}
            />
          </TouchableOpacity>
          <>
            <WFHDeleteAlert item={item} other={false} onPress={onPress} />
          </>
        </View>
      ) : (
        <View style={style.othercontainer}>
          <>
            <WFHDeleteAlert item={item} other={false} onPress={onPress} />
          </>
        </View>
      )}
      <Alert showAlert={showAlert} setShowAlert={setShowAlert}>
        Your request just got reviewed.You cannot edit now.
      </Alert>
    </>
  );
};
