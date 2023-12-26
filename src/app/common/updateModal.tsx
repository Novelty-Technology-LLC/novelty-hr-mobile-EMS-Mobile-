import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  BackHandler,
  Linking,
  Platform,
  View,
} from "react-native";
import { DialogContainer } from "./dialogContainer";
import Logo from "../../assets/images/novelty.png";
import CustomImage from "./image";
import { CustomButton } from "./customButton";
import { CustomText } from "../components/text";
import colors from "../../assets/colors";
import { fonts } from "../../assets/styles";
import VersionCheck from "react-native-version-check";
import { lookupServices } from "../services/lookupService";

const UpdateModal = ({ closeModal = () => {} }) => {
  const [isForceUpdate, setForceUpdate] = useState(false);
  const [loading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const lookup = await lookupServices.lookupField("force_app_update");

        if (typeof lookup === "object") {
          setForceUpdate(lookup.value);
        } else {
          if (lookup) {
            setForceUpdate(JSON.parse(lookup)?.value);
          }
        }
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    })();
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

      {loading ? (
        <ActivityIndicator
          color={colors.primary}
          size="large"
          style={{ alignSelf: "center", marginTop: 10 }}
        />
      ) : (
        <View
          style={{
            marginTop: 10,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          {!isForceUpdate && (
            <>
              <View style={{ flex: 0.5 }}>
                <CustomButton
                  label="No, Thanks"
                  buttonStyle={{ backgroundColor: "grey" }}
                  labelStyle={{ fontFamily: fonts.poppinsMedium }}
                  onPress={closeModal}
                />
              </View>
              <View style={{ marginHorizontal: 10 }}></View>
            </>
          )}
          <View style={{ flex: isForceUpdate ? 1 : 0.5 }}>
            <CustomButton
              label="Update"
              onPress={goToStore}
              labelStyle={{ fontFamily: fonts.poppinsMedium }}
            />
          </View>
        </View>
      )}
    </DialogContainer>
  );
};

export default UpdateModal;
