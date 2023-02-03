import { Formik } from "formik";
import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import {
  dashboardStyle,
  headerTxtStyle,
  listingStyle,
} from "../../../assets/styles";
import { menuStyles } from "../../../assets/styles/dashboard/menu.styles";
import { header as Header, button as Button, showToast } from "../../common";
import * as yup from "yup";
import { CustomButton } from "../../common/customButton";
import { CustomTextInput } from "../../common/customTextInput";
import { menuServices } from "../../services/menuService";
import { MenuContext } from "../../reducer/menuReducer";
import { useIsFocused } from "@react-navigation/native";

export const EditMenu = ({ navigation, route }: any) => {
  const { dispatchMenu } = useContext(MenuContext);
  const isFocused = useIsFocused();
  const item = route.params.item;
  const [menuText, setMenuText] = useState<string>(item.title);
  const [isLoading, setIsLoading] = useState(false);

  const schema = yup.object({
    menu: yup.string().required("Please input the menu."),
  });

  const onSubmit = () => {
    setIsLoading(true);
    menuServices
      .editMenu(item?.id, menuText)
      .then(() => {
        dispatchMenu({
          type: "UPDATE_ITEM",
          payload: { id: item?.id, value: menuText },
        });
        showToast("Menu updated successfully ");

        if (isFocused) navigation.goBack();
      })
      .catch((err) => {
        showToast(`${err.message} `, false);
      })
      .then(() => {
        setIsLoading(false);
      });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={listingStyle.mainContainer}>
        <Header icon={true}>
          <Text style={headerTxtStyle.headerText}>Edit Menu</Text>
        </Header>
        <View style={dashboardStyle.body}>
          <Text style={menuStyles.title}>{item.subTitle}</Text>
          <Formik
            enableReinitialize={true}
            initialValues={{ menu: `${item.title}` }}
            onSubmit={onSubmit}
            validationSchema={schema}
          >
            {(props) => {
              return (
                <>
                  <CustomTextInput
                    error={props.errors.menu}
                    touched={props.touched.menu}
                    textInputProps={{
                      placeholder: `Menu for ${item.subTitle}`,
                      autoFocus: true,
                      value: props.values.menu,
                    }}
                    onChange={(value) => {
                      props.handleChange("menu")(value);
                      setMenuText(value);
                    }}
                  />
                  <CustomButton
                    label='Update'
                    onPress={props.handleSubmit}
                    disabled={
                      menuText.trim() == item.title.trim() ||
                      menuText.trim() == ""
                    }
                    isLoading={isLoading}
                  />
                </>
              );
            }}
          </Formik>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};
