import React, { useContext, useState } from 'react';
import { View, Text, ScrollView, Image, ActivityIndicator } from 'react-native';
import { headerTxtStyle } from '../../assets/styles';
import { profileStyle as style } from '../../assets/styles/tabs';
import { tabHeader as Header } from '../common';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import colors from '../../assets/colors';
import { AuthContext } from '../reducer';
import ImageCropper from 'react-native-image-crop-picker';
import { formatPhoneNumber } from '../utils';
import { updateImage } from '../services';
import normalize from 'react-native-normalize';
import { momentdate } from '../utils/momentDate';
import { storeToken, removeToken, removeUser, setUser } from '../utils';
import { snackBarMessage, snackErrorBottom } from '../common';
import { SmallHeader } from '../common';
import { ProfileInfoComponent } from '../common/profileInformation';

const optionsPicker = {
  skipBackup: true,
  path: 'images',
  mediaType: 'photo',
};

const Profile = ({ navigation }: any) => {
  const { state, dispatch } = useContext(AuthContext);
  const [image, setimage] = useState(null);
  const [loading, setloading] = useState(false);

  const cleanImage = () =>
    ImageCropper.clean()
      .then(() => {
        console.log('removed all tmp images from tmp directory');
      })
      .catch((e) => {});

  const updateProfileImage = (image: any, data?: any) => {
    setimage(image);
    if (data?.image_url) {
      dispatch({
        type: 'SET_IMAGE',
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
      name: image.path.split('/').pop(),
      type: image.mime,
    })
      .then((data) => {
        removeToken();
        storeToken(JSON.stringify(data));
        removeUser();
        setUser(data);
        setloading(false);
        updateProfileImage({ ...image, visible: false }, data);
        snackBarMessage('Image uploaded');
        cleanImage();
      })
      .catch((err) => {
        setloading(false);
        cleanImage();
        snackErrorBottom('Something went wrong');
      });
  };

  let uri = image ? image.path : state?.user?.image_url;
  return state?.user ? (
    <View style={style.container}>
      <Header icon={true} navigation={navigation}>
        <Text style={headerTxtStyle.headerText}>Profile</Text>
      </Header>
      <ScrollView style={style.container} showsVerticalScrollIndicator={false}>
        <View style={style.imageView}>
          <View style={style.imageWrapper}>
            <Image
              style={style.image}
              source={{
                uri,
              }}
            />
          </View>
          {loading ? (
            <ActivityIndicator
              size="large"
              color={colors.white}
              style={{ marginTop: normalize(10) }}
            />
          ) : (
            <View style={style.label}>
              {image && image?.visible !== false ? (
                <View style={style.confirm}>
                  <TouchableOpacity onPress={() => setimage(null)}>
                    <View style={style.label}>
                      <Icon name="close" color="white" size={20}></Icon>
                      <Text style={style.labelText}>Cancel</Text>
                    </View>
                  </TouchableOpacity>
                  <View style={style.spacer} />
                  <TouchableOpacity onPress={confirm}>
                    <View style={style.label}>
                      <Icon name="check-bold" color="white" size={20}></Icon>
                      <Text style={style.labelText}>Confirm</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={style.textContainer}>
                  <TouchableOpacity onPress={() => uploadImage(true)}>
                    <View style={style.label}>
                      <Icon name="upload" color="white" size={20}></Icon>
                      <Text style={style.labelText}>Upload from library</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => uploadImage(false)}>
                    <View style={style.label}>
                      <Icon name="camera" color="white" size={20}></Icon>
                      <Text style={style.labelText}>Take a photo</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          )}
        </View>
      <ProfileInfoComponent user={state.user}/>
      </ScrollView>
    </View>
  ) : (
    <></>
  );
};

export { Profile };
