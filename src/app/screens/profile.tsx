import React, { useContext, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  ActivityIndicator,
  Dimensions,
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

const Profile = ({ navigation }: any) => {
  const { state, dispatch } = useContext(AuthContext);
  const [image, setimage] = useState(null);
  const [loading, setloading] = useState(false);
  console.log(state.user, "user");

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

  const uploadImage = (pick: boolean) => {
    const callback = (image: any) => {
      updateProfileImage(image);
    };

    pick
      ? ImageCropper.openPicker({
          width: 300,
          height: 400,
          cropping: true,
          includeBase64: true,
          compressImageQuality: 0.8,
          cropperCircleOverlay: true,
        }).then((image) => {
          callback(image);
        })
      : ImageCropper.openCamera({
          width: 300,
          height: 400,
          cropping: true,
          includeBase64: true,
          compressImageQuality: 0.8,
          cropperCircleOverlay: true,
        }).then((image) => {
          callback(image);
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
          <View style={[style.imageWrappers, style.iconCammerWrapper]}>
            <Icon name="camera" color="white" size={20}></Icon>
          </View>
        </View>
      </ScrollView>
    </View>
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
