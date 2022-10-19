import { View, Text, Platform, Button, ScrollView } from "react-native";
import { header as Header, showToast } from "../../common";
import { fonts, headerTxtStyle, theme } from "../../../assets/styles";
import { Formik } from "formik";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { CustomDivider } from "../../common/divider";
import {
  actions,
  RichEditor,
  RichToolbar,
} from "react-native-pell-rich-editor";
import moment from "moment";
import {
  addAnnouncementService,
  updateAnnouncementService,
} from "../../services";
import { CustomButton } from "../../common/customButton";
import { Calendar } from "@ui-kitten/components";
import { CustomTextInput } from "../../common/customTextInput";
import { useContext, useEffect, useRef, useState } from "react";
import React from "react";
import { goBack } from "../../utils/navigation";
import colors from "../../../assets/colors";
import { customTextFieldStyles } from "../../../assets/styles/common/custom_text_field.styles";
import { AnnouncementContext } from "../../reducer/announcementreducer";
import { StackActions, useNavigation } from "@react-navigation/native";
import { announcementValidationSchema } from "../../../validation/announcementValidationSchema";
const now = new Date();
const date = new Date(now.getFullYear(), now.getMonth(), now.getDate());
export const formatDateToISO = (date: any) => moment(date)?.toISOString();
export const formatDate = (date: any, format = "L") => {
  try {
    if (!date) {
      return "N/A";
    }
    return moment(date).format(format);
  } catch (error) {
    return "N/A";
  }
};
const AddAnnouncement = (props: any) => {
  const navigation: any = useNavigation();
  const { state, dispatch }: any = useContext(AnnouncementContext);
  const isEdit = props?.route?.params?.isEdit ?? false;
  const updateData = props?.route?.params?.data ?? " ";
  const titleRef = useRef<any>();
  const descriptionRef = useRef<any>();
  const [showCalender, setCalender] = useState(true);
  const [selectedDate, setSelectedDate] = React.useState(date);
  const componentRef = React.createRef<Calendar>();
  const [range, setRange] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>("");
  const [announcementData, setAnnouncementData] = useState<any>({
    title: "",
    description: "",
    html: "",
    date: moment(),
  });
  const announcementId = props?.route?.params?.data?.id;

  useEffect(() => {
    isEdit
      ? setAnnouncementData({
          ...announcementData,
          title: updateData.title,
          description: updateData.html,
        })
      : setAnnouncementData({ ...announcementData, Date: moment() });
  }, []);
  const onSubmit = async (values: any) => {
    setLoading(true);
    if (isEdit) {
      const payload = {
        ...values,
        html: values.description,
      };
      updateAppoinmentData(payload, announcementId);
    } else {
      const body = {
        ...values,
        title: values.title,
        html: values.description,
        date: moment(),
      };
      addAppoinmentData(body);
    }
  };
  const addAppoinmentData = (payload: any) => {
    addAnnouncementService(payload)
      .then((item: any) => {
        dispatch({
          type: "ADD_ANNOUNCEMENT",
          payload: { announcementData: { ...payload, id: item.data.data.id } },
        });
        setLoading(false);
        goBack();
        showToast("Added Successfully");
      })
      .catch(async (err: any) => {
        setLoading(false);
        goBack();
        setError("something went wrong");
      });
  };
  const updateAppoinmentData = async (payload: any, id: any) => {
    updateAnnouncementService(payload, id)
      .then((item: any) => {
        dispatch({
          type: "UPDATE_ANNOUNCEMENT",
          payload: { announcementData: payload, index: id },
        });
        setLoading(false);
        goBack();
        goBack();
        // navigation.popToTop();
        showToast("Update Successfully");
      })
      .catch(async (err: any) => {
        setLoading(false);
        showToast("something went wrong");
        setError("something went wrong");
      });
  };

  return (
    <ScrollView
      contentContainerStyle={{ flex: 1, backgroundColor: colors.white }}
    >
      <Header icon={true}>
        <Text style={headerTxtStyle.headerText}>Announcements</Text>
      </Header>
      <View
        style={{
          marginHorizontal: theme.size.lg,
          marginVertical: theme.size.lg,
        }}
      >
        <KeyboardAwareScrollView
          resetScrollToCoords={{ x: 0, y: 0 }}
          scrollEnabled={true}
          enableOnAndroid={true}
          enableAutomaticScroll={true}
          // style={[gs.container]}
          extraScrollHeight={Platform.OS === "ios" ? 180 : 100}
          extraHeight={Platform.OS === "android" ? 160 : 50}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode={"none"}
        >
          <Formik
            enableReinitialize
            initialValues={announcementData}
            validationSchema={announcementValidationSchema}
            onSubmit={onSubmit}
          >
            {({ values, handleChange, handleSubmit, touched, errors }: any) => {
              return (
                <>
                  <CustomTextInput
                    nextFieldRef={descriptionRef}
                    textInputProps={{
                      autoFocus: true,
                      defaultValue: values.title,
                      placeholder: "Title",
                    }}
                    onChange={(item: any) => handleChange("title")(item)}
                    ref={titleRef}
                    error={errors.title}
                    touched={touched.title}
                  />

                  <RichEditor
                    useContainer={false}
                    containerStyle={{
                      minHeight: 200,
                      backgroundColor: colors.grey,
                    }}
                    ref={descriptionRef}
                    initialContentHTML={values.description}
                    editorStyle={{
                      backgroundColor: colors.grey,
                      color: colors.fontBlack,
                    }}
                    placeholder={"Description"}
                    disabled={false}
                    onChange={(item: any) => {
                      values.description = item;
                      handleChange("description")(item);
                    }}
                  />
                  {/* code will be in need */}
                  {/* <RichToolbar
                    actions={[actions.insertLink]}
                    editor={descriptionRef}
                    style={{
                      backgroundColor: colors.grey,
                      alignItems: "flex-end",
                      paddingHorizontal: theme.size.xxs,
                    }}
                  /> */}
                  {errors.description && touched.description && (
                    <Text style={customTextFieldStyles.error}>
                      {errors.description}
                    </Text>
                  )}
                  {(errors.description && touched.description) ===
                  true ? null : (
                    <CustomDivider />
                  )}
                  <CustomButton
                    label="Submit"
                    onPress={handleSubmit}
                    isLoading={loading}
                  />
                </>
              );
            }}
          </Formik>
        </KeyboardAwareScrollView>
      </View>
    </ScrollView>
  );
};

export default AddAnnouncement;
