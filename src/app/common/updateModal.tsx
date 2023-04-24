import React, { useEffect, useState } from "react";
import { Linking, Platform, Text, View } from "react-native";
import { DialogContainer } from "./dialogContainer";
import Logo from "../../assets/images/novelty.png";
import CustomImage from "./image";
import { CustomButton } from "./customButton";
import { CustomText } from "../components/text";
import colors from "../../assets/colors";
import VersionCheck from "react-native-version-check";
import { fonts } from "../../assets/styles";

const UpdateModal = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    checkUpdate();
  }, []);

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
      setVisible(false);
      Linking.openURL(url);
    } catch (error) {}
  };

  const checkUpdate = async () => {
    try {
      const curretVersion = await VersionCheck.getCurrentVersion();
      const latestVersion = await VersionCheck.getLatestVersion();

      VersionCheck.needUpdate({
        currentVersion: curretVersion,
        latestVersion: latestVersion,
      }).then((res: any) => {
        if (res?.isNeeded) {
          setVisible(true);
        } else {
        }
      });
    } catch (e) {}
  };

  return (
    <DialogContainer
      onTouchOutside={false}
      visible={visible}
      setVisible={setVisible}
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
        <View style={{ width: "100%" }}>
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
