import React, { useContext, useRef, useState } from "react";
import BottomSheet from "react-native-raw-bottom-sheet";

import {
  View,
  Text,
  ScrollView,
  Image,
  ActivityIndicator,
  Pressable,
  Platform,
} from "react-native";
import { headerTxtStyle } from "../../assets/styles";
import { profileStyle, profileStyle as style } from "../../assets/styles/tabs";
import { showToast, tabHeader as Header } from "../common";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { TouchableOpacity } from "react-native-gesture-handler";
import colors from "../../assets/colors";
import { AuthContext } from "../reducer";
import ImageCropper from "react-native-image-crop-picker";
import { updateImage } from "../services";

import normalize from "react-native-normalize";
import { storeToken, removeToken, removeUser, setUser } from "../utils";
import { ProfileInfoComponent } from "../common/profileInformation";

import { CustomText } from "../components/text";
import { TermPolicy } from "../common/termPolicy";
import { CustomDivider } from "../common/divider";

const Profile = ({ navigation }: any) => {
  const { state, dispatch } = useContext(AuthContext);
  const [image, setimage] = useState(null);
  let refRBSheet = useRef<any>(null);

  const [loading, setloading] = useState(false);
  const [upload, setLoad] = useState(false);

  const cleanImage = () =>
    ImageCropper.clean()
      .then(() => {
        console.log("removed all tmp images from tmp directory");
      })
      .catch((e) => {});

  const updateProfileImage = (image: any, data?: any) => {
    setimage(image ?? image.data);
    setLoad(true);
    if (data?.image_url) {
      dispatch({
        type: "SET_IMAGE",
        payload: data?.image_url,
      });
    }
  };

  const menuForBottomSheet = ({
    title,
    iconName,
    onPress,
  }: {
    title: string;
    iconName: string;
    onPress: Function;
  }) => {
    return (
      <View>
        <Pressable style={style.bottomSheetMenu} onPress={onPress}>
          <Icon
            name={iconName}
            color={style.bottomSheetMenuIcon.color}
            size={15}
          ></Icon>

          <CustomText text={title} style={style.bottomSheetMenuTitle} />
        </Pressable>
      </View>
    );
  };
  const confirmForBottomSheet = ({
    title,
    iconName,
    onPress,
    isLoading = false,
  }: {
    title: string;
    iconName: string;
    onPress: Function;
    isLoading?: boolean;
  }) => {
    return (
      <View>
        {isLoading ? (
          <View
            style={{
              marginTop: normalize(40),
              marginLeft: normalize(20),
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ActivityIndicator color={colors.primary} />
            <Text style={{ marginLeft: 5 }}>Uploading image..</Text>
            <Text>Please wait</Text>
          </View>
        ) : (
          <>
            <Pressable style={style.bottomSheetMenu} onPress={onPress}>
              <Icon
                name={iconName}
                color={style.bottomSheetMenuIcon.color}
                size={15}
              />
              <CustomText text={title} style={style.bottomSheetMenuTitle} />
            </Pressable>
          </>
        )}
      </View>
    );
  };
  const callbackForUploadImage = (image: any) => {
    updateProfileImage(image);
  };
  const uploadImage = () => {
    ImageCropper.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: true,
      compressImageQuality: 0.8,
      cropperCircleOverlay: true,
    })
      .then((image) => {
        setLoad(true);
        callbackForUploadImage(image);
        // confirm()
      })
      .finally(() => {})
      .then((image) => {
        callbackForUploadImage(image);
      })
      .finally(() => {
        console.log("snbjsb");
      });
  };
  const openCamera = () =>
    ImageCropper.openCamera({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: true,
      compressImageQuality: 0.8,
      cropperCircleOverlay: true,
    }).then((image) => {
      setLoad(true);
      callbackForUploadImage(image);
    });

  const confirm = () => {
    setloading(true);
    updateImage(state.user.id, {
      data: image.data,
      name: image.path.split("/").pop(),
      type: image.mime,
    })
      .then((data) => {
        showToast("Image uploaded");
        removeToken();
        storeToken(JSON.stringify(data));
        removeUser();
        setUser(data);
        updateProfileImage({ ...image, visible: false }, data);
        cleanImage();
        setloading(false);
        refRBSheet?.current?.close();
        setLoad(false);
        navigation.navigate("Dashboard");
      })
      .catch((err) => {
        refRBSheet?.current?.close();
        setLoad(false);
        setloading(false);
        cleanImage();
        showToast("Something went wrong", false);
      });
  };

  let uri = image ? image?.path : state?.user?.image_url;
  const [oldimage, setoldimage] = useState(state.image_url);
  const cancel = () => {
    setloading(false);
    refRBSheet?.current?.close();
    setimage(oldimage);
    setLoad(false);
  };

  return state?.user ? (
    <>
      <BottomSheet
        openDuration={250}
        ref={refRBSheet}
        height={normalize(150)}
        customStyles={{
          container: {
            borderRadius: 10,
          },
        }}
      >
        {upload ? (
          <View>
            {confirmForBottomSheet({
              title: "Upload",
              iconName: "check",
              isLoading: loading,
              onPress: confirm,
            })}
            {!loading &&
              confirmForBottomSheet({
                title: "Close",
                iconName: "close",
                onPress: cancel,
              })}
          </View>
        ) : (
          <View>
            {menuForBottomSheet({
              title: "Upload from library",
              iconName: "upload",
              onPress: uploadImage,
            })}
            {menuForBottomSheet({
              title: "Take a photo",
              iconName: "camera",
              onPress: openCamera,
            })}
          </View>
        )}
      </BottomSheet>
      <Header icon={true} navigation={navigation}>
        <Text style={headerTxtStyle.headerText}>Profile</Text>
      </Header>
      <ScrollView style={style.container}>
        <View style={profileStyle.scrollStyle}>
          <View style={profileStyle.topContainer}></View>

          <View style={profileStyle.infoStyle}>
            <ProfileInfoComponent user={state.user} />

            <CustomDivider size="maxlarge" />
          </View>
          {/* <View style={{ ...style.imageView, position: "absolute" }}>
          
        </View> */}
          <View style={[style.imageWrapper, style.profileContainerWrapper]}>
            <Image
              style={[style.image, style.profileImageWrapper]}
              source={{
                uri: uri,
                cache: "force-cache",
              }}
            />
            <View style={style.iconCammerWrapper}>
              <TouchableOpacity
                style={[style.imageWrappers]}
                onPress={() => refRBSheet?.current?.open()}
              >
                <Icon name="camera" color="white" size={15}></Icon>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          backgroundColor: "white",

          justifyContent: "center",
        }}
      >
        <TermPolicy />
      </View>
    </>
  ) : (
    <></>
  );
};

export { Profile };

// {
//   loading ? (
//     <ActivityIndicator
//       size="large"
//       color={colors.white}
//       style={{ marginTop: normalize(10) }}
//     />
//   ) : (
//     <View style={style.label}>
//       {image && image?.visible !== false ? (
//         <View style={style.confirm}></View>
//       ) : (
//         <View style={style.textContainer}>
//           <TouchableOpacity onPress={() => uploadImage(true)}>
//             <View style={style.label}>
//               <Icon name="upload" color="white" size={20}></Icon>
//               <Text style={style.labelText}>Upload from library</Text>
//             </View>
//           </TouchableOpacity>
//           <TouchableOpacity onPress={() => uploadImage(false)}>
//             <View style={style.label}>
//               <Icon name="camera" color="white" size={20}></Icon>
//               <Text style={style.labelText}>Take a photo</Text>
//             </View>
//           </TouchableOpacity>
//         </View>
//       )}
//     </View>
//   );
// }
