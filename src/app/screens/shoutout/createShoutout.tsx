import { Formik } from "formik";
import moment from "moment";
import React, { useContext, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import normalize from "react-native-normalize";
import {
  dashboardStyle,
  fonts,
  headerTxtStyle,
  listingStyle,
  theme,
} from "../../../assets/styles";
import { textStyles } from "../../../assets/styles/common/text_styles";
import { createShoutSchema } from "../../../validation/createShoutoutSchema";
import { header as Header, showToast } from "../../common";
import { CustomButton } from "../../common/customButton";
import { CustomTextInput } from "../../common/customTextInput";
import { Space } from "../../common/space";
import { AuthContext } from "../../reducer";
import { ShoutoutContext } from "../../reducer/shoutoutReducer";
import { createShoutout, getShoutoutByID } from "../../services";

export const CreateShoutout = ({ route, navigation }: any) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { state, dispatch } = useContext(AuthContext);
  const employee = route.params;
  const { dispatchShoutout } = useContext(ShoutoutContext);

  const submit = (shoutout: string) => {
    setIsSubmitting(true);
    const submitData = {
      receiver: JSON.stringify([employee.id]),
      shoutout_from: state.user.id.toString(),
      shoutout,
      shoutout_date: moment().toISOString(),
    };

    createShoutout(submitData)
      .then(async (shoutoutData) => {
        await appendNewShoutoutToList(shoutoutData.id?.toString());
        setIsSubmitting(false);
        showToast("Shoutout created successfully ");
        navigation.goBack();
      })
      .catch((err) => {
        if (typeof err.message === "string") showToast(err.message, false);
        else showToast("An error occured ", false);
      })
      .then(() => {
        setIsSubmitting(false);
      });
  };

  const appendNewShoutoutToList = async (id: string) => {
    await getShoutoutByID(id).then((shoutout) => {
      dispatchShoutout({ type: "APPEND_SHOUTOUT", payload: shoutout });
    });
  };

  return (
    <View style={listingStyle.mainContainer}>
      <Header icon={true}>
        <Text style={headerTxtStyle.headerText}>Shoutout</Text>
      </Header>
      <ScrollView
        contentContainerStyle={dashboardStyle.body}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps='handled'
      >
        <Formik
          initialValues={{ shoutout: "" }}
          onSubmit={(values) => {
            submit(values.shoutout);
          }}
          validationSchema={createShoutSchema}
        >
          {(props) => {
            return (
              <>
                <Text
                  style={[
                    textStyles.title,
                    { marginBottom: normalize(theme.size.sm) },
                  ]}
                >
                  Give a shoutout to {employee.title}
                </Text>
                <View style={{}}>
                  <CustomTextInput
                    error={props.errors.shoutout}
                    touched={props.touched.shoutout}
                    textInputProps={{
                      placeholder: "Write a short appreciation note",
                      numberOfLines: 10,
                      textAlignVertical: "top",
                      value: props.values.shoutout,
                      multiline: true,
                    }}
                    onChange={props.handleChange("shoutout")}
                  />
                </View>
                <CustomButton
                  label='Submit'
                  onPress={props.handleSubmit}
                  isLoading={isSubmitting}
                />
              </>
            );
          }}
        </Formik>
      </ScrollView>
    </View>
  );
};
