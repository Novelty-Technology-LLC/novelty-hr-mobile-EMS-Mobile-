import React from "react";
import { BackHandler, Linking, Platform, View } from "react-native";
import { DialogContainer } from "./dialogContainer";
import Logo from "../../assets/images/novelty.png";
import CustomImage from "./image";
import { CustomButton } from "./customButton";
import { CustomText } from "../components/text";
import colors from "../../assets/colors";
import { fonts } from "../../assets/styles";
import VersionCheck from "react-native-version-check";
import { isForceUpdate } from "../api/uri";

const UpdateModal = ({ closeModal = () => {} }) => {
  const goToStore = async () => {
    try {
      let url = "";
      if (Platform.OS == "ios") {
        url = await VersionCheck.getAppStoreUrl({
          appID: "1536008045",
        });
      } else {
        url = await VersionCheck.getStoreUrl();
      }
      BackHandler.exitApp();
      Linking.openURL(url);
    } catch (error) {}
  };

  return (
    <DialogContainer
      onTouchOutside={false}
      visible={true}
      dialogStyle={{ width: "100%" }}
    >
      <View
        style={{
          borderColor: colors.primary,
          borderRadius: 100,
          borderWidth: 1,
          width: 85,
          height: 85,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CustomImage
          localImage
          image={Logo}
          style={{
            height: 55,
            width: 55,
          }}
        />
      </View>

      <CustomText
        text=" Update Available"
        style={{
          fontSize: 20,
          marginVertical: 10,
          fontFamily: fonts.PoppinsSemibold,
        }}
      />
      <CustomText
        text="New version of EMS is available."
        style={{ fontSize: 14, fontFamily: fonts.poppinsMedium }}
      />
      <View
        style={{
          marginTop: 10,
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        {!isForceUpdate && (
          <View style={{ width: "45%" }}>
            <CustomButton
              label="No, Thanks"
              buttonStyle={{ backgroundColor: "grey" }}
              labelStyle={{ fontFamily: fonts.poppinsMedium }}
              onPress={closeModal}
            />
          </View>
        )}
        <View style={{ width: isForceUpdate ? "100%" : "45%" }}>
          <CustomButton
            label="Update"
            onPress={goToStore}
            labelStyle={{ fontFamily: fonts.poppinsMedium }}
          />
        </View>
      </View>
    </DialogContainer>
  );
};

export default UpdateModal;
