import React, { useContext, useRef, useState } from "react";
import BottomSheet from "react-native-gesture-bottom-sheet";

import {
  View,
  Text,
  ScrollView,
  Image,
  ActivityIndicator,
  Dimensions,
  Button,
  StyleSheet,
  Pressable,
} from "react-native";
import { fonts, headerTxtStyle, theme } from "../../assets/styles";
import { profileStyle, profileStyle as style } from "../../assets/styles/tabs";
import { showToast, tabHeader as Header } from "../common";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import colors from "../../assets/colors";
import { AuthContext } from "../reducer";
import ImageCropper from "react-native-image-crop-picker";
import { updateImage } from "../services";
import { MenuProvider } from "react-native-popup-menu";

import normalize from "react-native-normalize";
import { storeToken, removeToken, removeUser, setUser } from "../utils";
import { ProfileInfoComponent } from "../common/profileInformation";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
import RBSheet from "react-native-raw-bottom-sheet";
import { CustomText } from "../components/text";
const Profile = ({ navigation }: any) => {
  const { state, dispatch } = useContext(AuthContext);
  const [image, setimage] = useState(null);
  const [loading, setloading] = useState(false);

  const cleanImage = () =>
    ImageCropper.clean()
      .then(() => {
        console.log("removed all tmp images from tmp directory");
      })
      .catch((e) => {});

  const updateProfileImage = (image: any, data?: any) => {
    setimage(image);
    if (data?.image_url) {
      dispatch({
        type: "SET_IMAGE",
        payload: data?.image_url,
      });
    }
  };
  const refRBSheet = useRef<any>();

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
        <Pressable style={style.bottomSheetMenu} onPress={onPress()}>
          <Icon name={iconName} color={style.bottomSheetMenuIcon.color} size={15}></Icon>

          <CustomText
            text={title}
            style={style.bottomSheetMenuTitle}
          />
        </Pressable>
      </View>
    );
  };
  const callbackForUploadImage = (image: any) => {
    updateProfileImage(image);
  };
  const uploadImage = () => {
    refRBSheet.current.close();
    ImageCropper.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: true,
      compressImageQuality: 0.8,
      cropperCircleOverlay: true,
    }).then((image) => {
      callbackForUploadImage(image);
    });
  };
  const openCamera = () => {
    refRBSheet.current.close();

    ImageCropper.openCamera({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: true,
      compressImageQuality: 0.8,
      cropperCircleOverlay: true,
    }).then((image) => {
      callbackForUploadImage(image);
    });
  };

  const confirm = () => {
    setloading(true);
    updateImage(state.user.id, {
      data: image.data,
      name: image.path.split("/").pop(),
      type: image.mime,
    })
      .then((data) => {
        removeToken();
        storeToken(JSON.stringify(data));
        removeUser();
        setUser(data);
        setloading(false);
        updateProfileImage({ ...image, visible: false }, data);
        showToast("Image uploaded");
        cleanImage();
      })
      .catch((err) => {
        setloading(false);
        cleanImage();
        showToast("Something went wrong", false);
      });
  };

  let uri = image ? image.path : state?.user?.image_url;
  return state?.user ? (
    <View style={style.container}>
      <Header icon={true} navigation={navigation}>
        <Text style={headerTxtStyle.headerText}>Profile</Text>
      </Header>
      <ScrollView
        style={profileStyle.scrollStyle}
        showsVerticalScrollIndicator={false}
      >
        <View style={profileStyle.topContainer}></View>
        <View style={profileStyle.infoStyle}>
          <ProfileInfoComponent user={state.user} />
        </View>
        {/* <View style={{ ...style.imageView, position: "absolute" }}>
          
        </View> */}

        <View style={[style.imageWrapper, style.profileContainerWrapper]}>
          <Image
            style={[style.image, style.profileImageWrapper]}
            source={{
              uri,
            }}
          />
          <View style={style.iconCammerWrapper}>
            <TouchableOpacity
              style={[style.imageWrappers]}
              onPress={() => refRBSheet.current.show()}
            >
              <Icon name="camera" color="white" size={15}></Icon>
            </TouchableOpacity>
            <BottomSheet
              hasDraggableIcon
              ref={refRBSheet}
              height={normalize(150)}
            >
              <View>
                {menuForBottomSheet({
                  title: "Upload from library",
                  iconName: "upload",
                  onPress: () => uploadImage,
                })}
                {menuForBottomSheet({
                  title: "Take a photo",
                  iconName: "camera",
                  onPress: () => openCamera,
                })}
              </View>
            </BottomSheet>
          </View>
        </View>
      </ScrollView>
    </View>
  ) : (
    <></>
  );
};

export { Profile };
const styles = StyleSheet.create({
  button: {
    height: 50,
    width: 150,
    backgroundColor: "#140078",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    shadowColor: "#8559da",
    shadowOpacity: 0.7,
    shadowOffset: {
      height: 4,
      width: 4,
    },
    shadowRadius: 5,
    elevation: 6,
  },
  text: {
    color: "white",
    fontWeight: "600",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

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
