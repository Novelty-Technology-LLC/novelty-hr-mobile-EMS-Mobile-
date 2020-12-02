import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { headerText, timeLogStyle } from '../../assets/styles';
import { profileStyle as style } from '../../assets/styles/tabs';
import { DialogContainer, tabHeader as Header } from '../common';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import colors from '../../assets/colors';
import { AuthContext } from '../reducer';
import ImagePicker from 'react-native-image-picker';
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

const options = {
  title: 'Pick a image',
  base64: true,
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
  maxWidth: 200,
  maxHeight: 200,
};

const createFormData = (photo) => {
  const data = new FormData();

  data.append('file', {
    name: photo.fileName,
    type: photo.type,
    uri: photo.uri,
  });

  Object.keys(photo).forEach((key) => {
    data.append(key, photo[key]);
  });

  return data;
};

const Profile = () => {
  const { state } = useContext(AuthContext);
  const [image, setimage] = useState(null);
  const [loading, setloading] = useState(false);
  const [dotloader, setdotloader] = useState(false);
  const [visible, setvisible] = useState(false);
  const [date, setDate] = useState(new Date());
  const [birth, setbirth] = useState(null);

  const modalfilter = (date) => momentdate(date) < momentdate();

  const uploadImage = () => {
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
      } else if (response.error) {
      } else if (response.customButton) {
      } else {
        let index = response.uri.lastIndexOf('/');
        let name = response.uri.slice(index + 1, response.uri.length);

        Platform.OS === 'android'
          ? response.uri
          : (response.uri = response.uri.replace('file://', '')) &&
            (response.fileName = name),
          setimage(response);
      }
    });
  };

  const confirm = () => {
    setloading(true);
    const data = createFormData(image);

    updateImage(state.user.id, data)
      .then((data) => {
        removeToken();
        storeToken(JSON.stringify(data));
        removeUser();
        setUser(data);
        setloading(false);
        setimage({ ...image, visible: false });
        snackBarMessage('Image uploaded');
      })
      .catch((err) => snackErrorBottom('Something went wrong'));
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

  let uri = image ? image.uri : state.user.image_url;

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
              <SmallHeader text="Personal Info" />
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
                    <Text style={style.date}>
                      {(birth && birth.slice(3, 15)) ||
                        (state.user.birth_date &&
                          state.user.birth_date.slice(3, 15)) ||
                        'Not available'}
                    </Text>
                  )}
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View style={style.infoView}>
            <View style={style.body}>
              <SmallHeader text="Contact Info" />
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
          <View style={style.infoView}>
            <View style={style.body}>
              <SmallHeader text="Contact Info" />
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
          <View style={style.infoView}>
            <View style={style.body}>
              <SmallHeader text="Contact Info" />
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
          <View style={style.infoView}>
            <View style={style.body}>
              <SmallHeader text="Contact Info" />
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
