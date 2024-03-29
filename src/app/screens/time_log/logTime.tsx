import React, { useContext, useState } from "react";
import {
  View,
  Text,
  Platform,
  ActivityIndicator,
  Keyboard,
} from "react-native";
import { headerTxtStyle, requestLeave } from "../../../assets/styles";
import {
  header as Header,
  showToast,
  snackBarMessage,
  snackErrorBottom,
} from "../../common";
import { Description } from "../../components/request_screen";
import { Calendar } from "../../components/time_log";
import Time from "../../components/time_log/time";
import { button as Button } from "../../common";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Projects from "../../components/time_log/projects";
import * as Yup from "yup";
import { Formik } from "formik";
import { checkunder24Hrs, getUser } from "../../utils";
import { submitTimeLog } from "../../services/timeLogService";
import { useNavigation } from "@react-navigation/native";
import colors from "../../../assets/colors";
import { TimeLogContext } from "../../reducer";
import { checkAndReplace, momentdate } from "../../utils/momentDate";

const LogTime = ({ route }: any) => {
  const navigation = useNavigation();
  let olddata = route.params;
  let log_date: string = "";
  if (olddata?.not_old) {
    log_date = olddata.log_date;
    olddata = null;
  }

  const [isLoading, setIsLoading] = useState(false);
  const { timelogs, dispatchTimeLog } = useContext(TimeLogContext);
  const [error, setError] = useState<any>(null);
  const [hashtag, setHashtag] = useState([]);

  const initialValues = {
    log_date: olddata ? new Date(olddata.log_date) : new Date().toJSON(),
    duration: olddata?.item?.time ?? "60",
    project_id: olddata?.project_id ?? "",
    note: olddata?.item?.task ?? "",
  };

  const validationSchema = Yup.object().shape({
    log_date: Yup.date().nullable().required("Date is a required"),
    duration: Yup.string()
      .required("Time is required")
      .label("duration")
      .min(2, "Time duration should be greater than 0"),
    project_id: Yup.number()
      .required("Project is required")
      .label("project_id"),
    note: Yup.string().required("Task summary is required").label("note"),
  });
  const addHashtag = async (values: any) => {
    const user = await getUser();
    values.user_id = JSON.parse(user).id; // REMOVABLE

    values.hashtag =
      values?.hashtag?.length > 0
        ? JSON.parse(values.hashtag)
        : [].concat(olddata?.item?.hashtag);

    const dataObj = {
      old: olddata && olddata.id ? olddata : null,
      new: values,
    };
    setIsLoading(true);
    const pastData = timelogs.present
      .concat(timelogs.past)
      .filter(
        (log) =>
          momentdate(log.log_date, "ll") ===
            momentdate(values.log_date, "ll") &&
          log.project_id == values.project_id
      );

    if (
      (pastData[0] &&
        checkunder24Hrs(
          parseInt(pastData[0].duration) + parseInt(values.duration)
        )) ||
      !pastData[0]
    ) {
      const selectedDate =
        Object.keys(timelogs.selectedDate).length !== 0
          ? { ...timelogs.selectedDate }
          : null;
      const historyDate =
        Object.keys(timelogs.historyDate).length !== 0
          ? { ...timelogs.historyDate }
          : null;

      submitTimeLog(dataObj, selectedDate, historyDate)
        .then((data) => {
          if (Array.isArray(data)) {
            dispatchTimeLog({
              type: "CHANGE",
              payload: {
                present: data[0],
                past: data[1] ? data[1] : timelogs.past,
              },
            });
            navigation.navigate("timelog");
            setIsLoading(false);
            showToast("TimeLog added ");
          } else {
            checkAndReplace(data, timelogs, dispatchTimeLog);
            navigation.navigate("timelog");
            setIsLoading(false);
            showToast("TimeLog updated ");
          }
        })
        .catch((err) => {
          showToast("Someting went wrong ", false);
          setIsLoading(false);
        });
    } else {
      Keyboard.dismiss();
      setIsLoading(false);
      showToast("You cannot log more than 24 hours a day ", false);
    }
  };

  const onSubmit = async (values, { setErrors }: any) => {
    if (!values?.hashtag || !JSON.parse(values.hashtag)?.length) {
      if (olddata != null) {
        addHashtag(values);
      } else {
        return setError("Hashtag cannot be empty");
      }
    } else if (values?.hashtag && JSON.parse(values.hashtag)?.length > 2) {
      return setError("You can only select 2 #hastags");
    }
    addHashtag(values);
    // const user = await getUser();
    // values.user_id = JSON.parse(user).id;

    // values.hashtag =
    //   values?.hashtag?.length > 0
    //     ? JSON.parse(values.hashtag)
    //     : [].concat(olddata?.item?.hashtag);

    // const dataObj = {
    //   old: olddata && olddata.id ? olddata : null,
    //   new: values,
    // };
    // setIsLoading(true);
    // const pastData = timelogs.present
    //   .concat(timelogs.past)
    //   .filter(
    //     (log) =>
    //       momentdate(log.log_date, "ll") ===
    //       momentdate(values.log_date, "ll") &&
    //       log.project_id == values.project_id
    //   );

    // if (
    //   (pastData[0] &&
    //     checkunder24Hrs(
    //       parseInt(pastData[0].duration) + parseInt(values.duration)
    //     )) ||
    //   !pastData[0]
    // ) {
    //   const selectedDate =
    //     Object.keys(timelogs.selectedDate).length !== 0
    //       ? { ...timelogs.selectedDate }
    //       : null;
    //   const historyDate =
    //     Object.keys(timelogs.historyDate).length !== 0
    //       ? { ...timelogs.historyDate }
    //       : null;

    //   submitTimeLog(dataObj, selectedDate, historyDate)
    //     .then((data) => {

    //       if (Array.isArray(data)) {
    //         dispatchTimeLog({
    //           type: "CHANGE",
    //           payload: {
    //             present: data[0],
    //             past: data[1] ? data[1] : timelogs.past,
    //           },
    //         });
    //         navigation.navigate("timelog");
    //         setIsLoading(false);
    //         snackBarMessage("TimeLog updated");
    //       } else {
    //         checkAndReplace(data, timelogs, dispatchTimeLog);
    //         navigation.navigate("timelog");
    //         setIsLoading(false);
    //         snackBarMessage("TimeLog updated");
    //       }
    //     })
    //     .catch((err) => {});
    // } else {
    //   Keyboard.dismiss();
    //   setIsLoading(false);
    //   snackErrorBottom({
    //     message: "You cannot log more than 24 hours a day ",
    //   });
    // }
  };

  const onChangeHashTag = (value: boolean) => {
    if (value) setError(null);
  };

  return (
    <>
      <Header icon={true}>
        <Text style={headerTxtStyle.headerText}> Log Time</Text>
      </Header>
      <KeyboardAwareScrollView
        style={requestLeave.container}
        scrollEnabled={true}
        enableOnAndroid={true}
        enableAutomaticScroll={true}
        extraScrollHeight={Platform.OS === "ios" ? 180 : 100}
        extraHeight={Platform.OS === "android" ? 160 : 50}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode={"none"}
      >
        <Formik
          validationSchema={validationSchema}
          initialValues={initialValues}
          onSubmit={(values, { setErrors }) => onSubmit(values, setErrors)}
        >
          {({ handleChange, handleSubmit, values, errors, touched }) => (
            <>
              <Calendar
                handleChange={handleChange}
                defaultValue={log_date ? log_date : olddata && olddata.log_date}
              />
              <Projects
                handleChange={handleChange}
                error={errors}
                touched={touched}
                defaultValue={olddata && olddata.project?.id}
              />
              <Time
                handleChange={handleChange}
                defaultValue={olddata && olddata.item && olddata.item.time}
                error={errors}
                touched={touched}
              />
              <Description
                handleChange={handleChange}
                timelog={true}
                hashtag={hashtag}
                defaultValue={olddata && olddata.item && olddata.item.task}
                updatehashtag={olddata && olddata.item && olddata.item.hashtag}
                error={errors}
                hashtagError={error}
                touched={touched}
                onChangeHashTag={onChangeHashTag}
                values={values}
              />
              <Button onPress={() => !isLoading && handleSubmit()}>
                <View
                  style={[
                    requestLeave.buttonView,
                    olddata
                      ? requestLeave.editLogButtonView
                      : requestLeave.logButtonView,
                  ]}
                >
                  <Text style={requestLeave.buttonText}>
                    {olddata && olddata.note ? "Update" : "Submit"}
                  </Text>
                  {isLoading && (
                    <ActivityIndicator size={30} color={colors.white} />
                  )}
                </View>
              </Button>
            </>
          )}
        </Formik>
      </KeyboardAwareScrollView>
    </>
  );
};

export { LogTime };
