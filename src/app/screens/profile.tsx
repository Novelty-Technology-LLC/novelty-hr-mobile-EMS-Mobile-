import React, { useContext, useState } from 'react';
import { View, Text, ScrollView, Image, ActivityIndicator } from 'react-native';
import { headerText, timeLogStyle } from '../../assets/styles';
import { profileStyle as style } from '../../assets/styles/tabs';
import { DialogContainer, tabHeader as Header } from '../common';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import colors from '../../assets/colors';
import { AuthContext } from '../reducer';
import ImagePicker from 'react-native-image-picker';
import ImageCropper from 'react-native-image-crop-picker';
import { formatPhoneNumber } from '../utils';
import { updateImage, updateBirthday } from '../services';
import normalize from 'react-native-normalize';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Calendar } from '@ui-kitten/components';
import { default as theme } from '../../assets/styles/leave_screen/custom-theme.json';
import { momentdate } from '../utils/momentDate';
import { storeToken, removeToken, removeUser, setUser } from '../utils';
import Loader from 'react-native-three-dots-loader';
import { snackBarMessage, snackErrorBottom } from '../common';
import { SmallHeader } from '../common';

//file:///storage/emulated/0/Pictures/images/image-a669af60-0537-4fbd-8875-ad7e5a41d352.jpg image/jpeg image-a669af60-0537-4fbd-8875-ad7e5a41d352.jpg

const optionsPicker = {
  title: 'Pick a image',
  base64: true,
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
  const { state } = useContext(AuthContext);
  const [image, setimage] = useState(null);
  const [loading, setloading] = useState(false);
  const [dotloader, setdotloader] = useState(false);
  const [visible, setvisible] = useState(false);
  const [date, setDate] = useState(new Date());
  const [birth, setbirth] = useState(null);

  const modalfilter = (date) => momentdate(date) < momentdate();

  const cleanImage = () =>
    ImageCropper.clean()
      .then(() => {
        console.log('removed all tmp images from tmp directory');
      })
      .catch((e) => {});

  const uploadImage = () => {
    ImagePicker.showImagePicker(optionsPicker, (response) => {
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
        }).then((image) => setimage(image));
      }
    });
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
        cleanImage();
        snackErrorBottom('Something went wrong');
      });
  };

  const submit = (nextDate) => {
    setDate(nextDate), setvisible(false);
    setdotloader(true);
    updateBirthday(state.user.id, nextDate + 1)
      .then((data) => {
        setbirth(data.birth_date);
        removeToken();
        storeToken(JSON.stringify(data));
        removeUser();
        setUser(data);
        setdotloader(false);
        snackBarMessage('Birthdate updated');
      })
      .catch((err) => snackErrorBottom(err));
  };

  let uri = image ? image.path : state.user.image_url;

  return (
    <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
      <View style={style.container}>
        <Header icon={true}>
          <Text style={headerText}>Profile</Text>
        </Header>
        <ScrollView
          contentContainerStyle={style.container}
          showsVerticalScrollIndicator={false}
        >
          {date && (
            <DialogContainer
              visible={visible}
              setVisible={setvisible}
              setdotloader={setdotloader}
            >
              <Calendar
                style={timeLogStyle.modalCalender}
                filter={modalfilter}
                min={new Date(1970, 1)}
                date={date}
                onSelect={(nextDate) => submit(nextDate)}
              />
            </DialogContainer>
          )}
          <View style={style.imageView}>
            <Image
              style={style.image}
              source={{
                uri,
              }}
            />
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
                  <TouchableOpacity onPress={uploadImage}>
                    <View style={style.label}>
                      <Icon name="upload" color="white" size={20}></Icon>
                      <Text style={style.labelText}>Upload your picture</Text>
                    </View>
                  </TouchableOpacity>
                )}
              </View>
            )}
          </View>
          <View style={style.infoView}>
            <View style={style.body}>
              <SmallHeader text="Personal Information" />
              {state.user.employee_id && (
                <View style={style.icon}>
                  <Icon name="fingerprint" color={colors.primary} size={25} />
                  <Text style={style.text}>{state.user?.employee_id}</Text>
                </View>
              )}
              <View style={style.icon}>
                <Icon name="account-circle" color={colors.primary} size={25} />
                <Text style={style.text}>
                  {state.user.first_name + ' ' + state.user.last_name}
                </Text>
              </View>
              <View style={style.icon}>
                <Icon
                  name="human-male-female"
                  color={colors.primary}
                  size={25}
                />
                <Text style={style.gender}>{state.user.gender}</Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  setvisible(true), setdotloader(true);
                }}
              >
                <View style={style.icon}>
                  <Icon name="cake-variant" color={colors.primary} size={25} />
                  {dotloader ? (
                    <View style={style.date}>
                      <Loader useNativeDriver="true" />
                    </View>
                  ) : (
                    <>
                      <Text style={style.date}>
                        {(birth && birth.slice(3, 15)) ||
                          (state.user.birth_date &&
                            state.user.birth_date.slice(3, 15)) ||
                          'Not available'}
                      </Text>
                      {birth === null && (
                        <View style={style.msg}>
                          <Icon
                            name="calendar-month-outline"
                            size={15}
                            color={colors.primary}
                          />
                        </View>
                      )}
                    </>
                  )}
                </View>
              </TouchableOpacity>
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
                <Icon
                  name="email-newsletter"
                  color={colors.primary}
                  size={25}
                />
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
        </ScrollView>
      </View>
    </ApplicationProvider>
  );
};

export { Profile };
