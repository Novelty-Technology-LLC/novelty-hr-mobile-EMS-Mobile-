import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { headerText } from '../../assets/styles';
import { profileStyle as style } from '../../assets/styles/tabs';
import { tabHeader as Header } from '../common';
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
import Dialog from 'react-native-dialog';
import { momentdate } from '../utils/momentDate';

const options = {
  title: 'Pick a image',
  base64: true,
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

const createFormData = (photo) => {
  const data = new FormData();

  data.append('file', {
    name: photo.fileName,
    type: photo.type,
    uri:
      Platform.OS === 'android' ? photo.uri : photo.uri.replace('file://', ''),
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
        setimage(response);
      }
    });
  };

  const confirm = () => {
    setloading(true);
    const data = createFormData(image);

    updateImage(state.user.id, data).then((res) =>
      console.log('data -> ', res.data)
    );
    setimage(null);
  };

  const submit = (nextDate) => {
    setDate(nextDate), setvisible(false);
    updateBirthday(state.user.id, nextDate + 1).then((data) =>
      setbirth(data.birth_date)
    );
  };

  return (
    <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
      <View style={style.container}>
        <ScrollView
          contentContainerStyle={style.container}
          showsVerticalScrollIndicator={false}
        >
          <Header>
            <Text style={headerText}>Profile</Text>
          </Header>
          {date && (
            <Dialog.Container
              visible={visible}
              contentStyle={style.modalCalender}
              onBackdropPress={() => setvisible(false)}
            >
              <Calendar
                filter={modalfilter}
                min={new Date(1970, 1)}
                date={date}
                onSelect={(nextDate) => submit(nextDate)}
              />
            </Dialog.Container>
          )}
          <View style={style.imageView}>
            <Image
              style={style.image}
              source={{
                uri: image?.uri || state.user.image_url,
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
                {image ? (
                  <View style={style.confirm}>
                    <TouchableOpacity onPress={() => setimage(null)}>
                      <View style={style.icon}>
                        <Icon name="close" color="white" size={30}></Icon>
                        <Text style={style.imageText}>Cancel</Text>
                      </View>
                    </TouchableOpacity>
                    <View style={style.spacer} />
                    <TouchableOpacity onPress={confirm}>
                      <View style={style.icon}>
                        <Icon name="check-bold" color="white" size={30}></Icon>
                        <Text style={style.imageText}>Confirm</Text>
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
              <Text style={style.heading}>Personal Info</Text>
              <View style={style.icon}>
                <Icon name="account-circle" color={colors.primary} size={30} />
                <Text style={style.text}>
                  {state.user.first_name + ' ' + state.user.last_name}
                </Text>
              </View>
              <View style={style.icon}>
                <Icon name="account-circle" color={colors.primary} size={30} />
                <Text style={style.text}>{state.user.gender}</Text>
              </View>
              <TouchableOpacity onPress={() => setvisible(true)}>
                <View style={style.icon}>
                  <Icon name="cake-variant" color={colors.primary} size={30} />
                  <Text style={style.date}>
                    {(birth && birth.slice(0, 15)) ||
                      (state.user.birth_date &&
                        state.user.birth_date.slice(0, 15)) ||
                      'Not available'}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View style={style.infoView}>
            <View style={style.body}>
              <Text style={style.heading}>Contact Info</Text>
              <View style={style.icon}>
                <Icon
                  name="email-newsletter"
                  color={colors.primary}
                  size={30}
                />
                <Text style={style.text}>{state.user.email}</Text>
              </View>
              <View style={style.icon}>
                <Icon name="phone" color={colors.primary} size={30} />
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
