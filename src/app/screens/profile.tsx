import React, { useContext, useState } from 'react';
import { View, Text, ScrollView, Image, ActivityIndicator } from 'react-native';
import { headerTxtStyle } from '../../assets/styles';
import { profileStyle as style } from '../../assets/styles/tabs';
import { tabHeader as Header } from '../common';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import colors from '../../assets/colors';
import { AuthContext } from '../reducer';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import ImageCropper from 'react-native-image-crop-picker';
import { formatPhoneNumber } from '../utils';
import { updateImage } from '../services';
import normalize from 'react-native-normalize';
import { momentdate } from '../utils/momentDate';
import { storeToken, removeToken, removeUser, setUser } from '../utils';
import { snackBarMessage, snackErrorBottom } from '../common';
import { SmallHeader } from '../common';

const optionsPicker = {
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

// const createFormData = (photo) => {
//   const data = new FormData();

//   data.append('file', {
//     name: photo.fileName,
//     type: photo.type,
//     uri: photo.uri,
//   });

//   Object.keys(photo).forEach((key) => {
//     data.append(key, photo[key]);
//   });

//   return data;
// };

const Profile = () => {
  const { state, dispatch } = useContext(AuthContext);
  const [image, setimage] = useState(null);
  const [loading, setloading] = useState(false);

  const modalfilter = (date) => momentdate(date) < momentdate();

  const cleanImage = () =>
    ImageCropper.clean()
      .then(() => {
        console.log('removed all tmp images from tmp directory');
      })
      .catch((e) => {});

  const uploadImage = (pick: boolean) => {
    const callback = (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        ImageCropper.openCropper({
          path: response.uri,
          width: 300,
          height: 400,
          cropperCircleOverlay: true,
          includeBase64: true,
          compressImageQuality: 0.8,
        }).then((image) => setimage(image));
      }
    };

    pick
      ? launchImageLibrary(optionsPicker, callback)
      : launchCamera(optionsPicker, callback);
  };

  const confirm = () => {
    setloading(true);
    // const data = createFormData(image);
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
        setimage({ ...image, visible: false });
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

  return state.user ? (
    <View style={style.container}>
      <Header icon={true}>
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
        <View style={style.infoView}>
          <View style={style.body}>
            <SmallHeader text="Personal Information" />
            <View style={style.icon}>
              <Icon name="account-circle" color={colors.primary} size={25} />
              <Text style={style.text}>
                {state.user.first_name + ' ' + state.user.last_name}
              </Text>
            </View>
            <View style={style.icon}>
              <Icon name="human-male-female" color={colors.primary} size={25} />
              <Text style={style.gender}>{state.user.gender}</Text>
            </View>
            <View style={style.icon}>
              <Icon name="cake-variant" color={colors.primary} size={25} />
              <Text style={style.date}>{state.user.birth_date}</Text>
            </View>
            {state.user.blood_group && (
              <View style={style.icon}>
                <Icon name="water" color={colors.primary} size={25} />
                <Text style={style.text}>{state.user?.blood_group}</Text>
              </View>
            )}
          </View>
        </View>
        <View style={style.infoView}>
          <View style={style.body}>
            <SmallHeader text="Contact Information" />
            <View style={style.icon}>
              <Icon name="email-newsletter" color={colors.primary} size={25} />
              <Text style={style.text}>{state.user.email}</Text>
            </View>
            <View style={style.icon}>
              <Icon name="phone" color={colors.primary} size={25} />
              <Text style={style.text}>
                {formatPhoneNumber(state.user.phone)}
              </Text>
            </View>
          </View>
        </View>
        <View style={style.infoView}>
          <View style={style.body}>
            <SmallHeader text="Employee Information" />

            <View style={style.icon}>
              <Icon
                name="card-account-details"
                color={colors.primary}
                size={25}
              />
              <Text style={style.text}>{state.user?.employee_id}</Text>
            </View>

            <View style={style.icon}>
              <Icon name="location-enter" color={colors.primary} size={25} />
              <Text style={style.text}>{state.user.join_date}</Text>
            </View>

            <View style={style.icon}>
              <Icon name="account-tie" color={colors.primary} size={25} />
              <Text style={style.designation}>{state.user.designation}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  ) : (
    <></>
  );
};

export { Profile };
