import React, { useContext, useState } from "react";
import {
  Text,
  View,
  ActivityIndicator,
  Platform,
  Keyboard,
} from "react-native";
import {
  header as Header,
  showToast,
  snackBarMessage,
  snackErrorBottom,
} from "../../common";
import * as eva from "@eva-design/eva";
import { ApplicationProvider } from "@ui-kitten/components";
import { default as theme } from "../../../assets/styles/leave_screen/custom-theme.json";
import {
  approveRequest,
  headerTxtStyle,
  requestLeave as style,
} from "../../../assets/styles";
import {
  CalendarComponent,
  Teams,
  Leavetype,
  Description,
} from "../../components/request_screen";
import { button as Button } from "../../common";
import { Formik } from "formik";
import * as Yup from "yup";
import { editRequest, postRequest } from "../../services";
import colors from "../../../assets/colors";
import { useNavigation } from "@react-navigation/native";
import { AuthContext, RequestContext } from "../../reducer";
import { snackErrorTop } from "../../common";
import { checkIfRequested, checkValidityQuota, dateMapper } from "../../utils";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import moment from "moment";

const validationSchema = Yup.object().shape({
  date: Yup.object()
    .shape({
      startDate: Yup.date().nullable(),
      endDate: Yup.date().nullable(),
    })
    .required("Date is required"),
  type: Yup.string().required().label("type"),
  note: Yup.string().required("Leave note is required").label("note"),
  lead: Yup.array().of(Yup.number()).label("lead"),
  status: Yup.string().label("status"),
});

const RequestLeave = ({ route }: any) => {
  const olddata = route.params;
  const navigation = useNavigation();
  const { state } = useContext(AuthContext);
  const { dispatchRequest, requests } = useContext(RequestContext);
  const [isLoading, setisLoading] = useState(false);

  const initialValues = {
    date: olddata ? olddata.date : "",
    type: olddata ? olddata.type : "PAID TIME OFF",
    status: olddata ? olddata.state : "Pending",
    note: olddata ? olddata.note : "",
    lead: olddata ? olddata.lead : [],
  };

  const submitRequest = (data) => {
    postRequest(data)
      .then((res) => {
        dispatchRequest({ type: "UPDATEQUOTA", payload: res.data.data.quota });
        dispatchRequest({ type: "ADD", payload: res.data.data.leave });
        navigation.navigate("leaveList");
        setisLoading(false);
        showToast("Request created");
      })
      .catch((err) => console.log(err));
  };

  const updateReq = (data) => {
    editRequest(olddata.id, data)
      .then((res) => {
        res.quota.map((item) => {
          dispatchRequest({ type: "UPDATEQUOTA", payload: item });
        });
        dispatchRequest({ type: "UPDATE", payload: res.leave });
        navigation.navigate("leaveList");
        showToast("Request updated");

        setisLoading(false);
      })
      .catch((err) => console.log(err));
  };

  const onSubmit = async (values) => {
    const date = JSON.parse(values.date);

    const leaveDate = moment(date.startDate).format("YYYY-MM-DD");
    const today = moment(new Date()).format("YYYY-MM-DD");

    if (
      moment(leaveDate).format("YYYY-MM-DD") <= today &&
      Number(moment(new Date()).format("HH")) >= 10
    ) {
      if (moment(leaveDate).format("YYYY-MM-DD") <= today) {
        showToast("Choosen date aleready passed away", false);
      } else {
        showToast("You cannot take leave after 10 am", false);
      }
    } else {
      try {
        const allrequests = [
          ...requests.pastrequests,
          ...requests.requests,
        ].filter(
          (req) =>
            req.state === "Approved" ||
            req.state === "In Progress" ||
            req.state === "Pending"
        );
        if (!olddata && checkIfRequested(allrequests, values)) {
          return showToast("Requested date cannot be requested again", false);
        }
        if (olddata && checkIfRequested(allrequests, values, olddata)) {
          return showToast("Requested date cannot be requested again", false);
        }
        const date = JSON.parse(values.date);
        let dayArray = [];
        const startDate = new Date(date.startDate).toString().slice(0, 15);

        let endDate = "";
        if (date["endDate"] === null) {
          endDate = startDate;
        } else {
          endDate = new Date(date.endDate).toString().slice(0, 15);
        }

        let day = 0;
        if (olddata) {
          let oldday = dateMapper(
            olddata.leave_date.startDate,
            olddata.leave_date.endDate
          );
          day = dateMapper(startDate, endDate);
          if (olddata.type === values.type) {
            dayArray = [{ days: day - oldday, dayType: values.type }];
          } else {
            dayArray = [
              { days: day, dayType: values.type },
              { days: -oldday, dayType: olddata.type },
            ];
          }
          dayArray.map((day) => {
            if (values.type === day.dayType) {
              // if (checkValidityQuota(requests.quota, values.type, day.days)) {
              //   throw new Error(`Selected day exceeds ${values.type}`);
              // }
            }
          });
        } else {
          day = dateMapper(startDate, endDate);
          // if (checkValidityQuota(requests.quota, values.type, day)) {
          //   throw new Error(`Selected day exceeds ${values.type}`);
          // }
        }
        delete values.date;

        const dayData = olddata ? dayArray : day;

        const requestData = {
          ...values,
          leave_date: {
            startDate,
            endDate,
          },
          day: dayData,
          requestor_id: state.user.id,
          requestor_name: state.user.first_name,
          uuid: state.user.uuid,
          gender: state.user.gender,
        };

        setisLoading(true);
        Keyboard.dismiss();
        olddata ? updateReq(requestData) : submitRequest(requestData);
      } catch (error) {
        if (!error.message.includes("Selected day exceeds"))
          error.message = "Unkonown error occured";

        snackErrorTop(error);
      }
    }
  };

  return (
    <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
      <Header icon={true}>
        <View style={approveRequest.headContainer}>
          <Text style={headerTxtStyle.headerText}>Request Leave</Text>
        </View>
      </Header>
      <KeyboardAwareScrollView
        style={style.container}
        scrollEnabled={true}
        enableOnAndroid={true}
        enableAutomaticScroll={true}
        extraScrollHeight={Platform.OS === "ios" ? 180 : 70}
        extraHeight={Platform.OS === "android" ? 140 : 50}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode={"none"}
      >
        <Formik
          validationSchema={validationSchema}
          initialValues={initialValues}
          onSubmit={(values) => onSubmit(values)}
        >
          {({ handleChange, handleSubmit, values, errors, touched }) => (
            <>
              <CalendarComponent
                style={style}
                handleChange={handleChange}
                defaultValue={olddata && olddata.leave_date}
                olddata_id={olddata && olddata.id}
                error={errors}
                touched={touched}
              />
              <Teams
                handleChange={handleChange}
                defaultValue={olddata && olddata.lead}
                values={values}
              />
              <Leavetype
                handleChange={handleChange}
                defaultValue={olddata && olddata.type}
              />
              <Description
                handleChange={handleChange}
                defaultValue={olddata && olddata?.note}
                error={errors}
                touched={touched}
              />
              <Button
                onPress={() => {
                  Keyboard.dismiss();
                  handleSubmit();
                }}
                disabled={isLoading}
              >
                <View style={style.buttonView}>
                  <Text style={style.buttonText}>Submit Request</Text>
                  {isLoading && (
                    <ActivityIndicator size={30} color={colors.white} />
                  )}
                </View>
              </Button>
            </>
          )}
        </Formik>
      </KeyboardAwareScrollView>
    </ApplicationProvider>
  );
};

export { RequestLeave };
