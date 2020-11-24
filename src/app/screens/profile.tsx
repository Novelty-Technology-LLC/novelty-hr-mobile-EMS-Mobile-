import React, { useContext, useState } from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import { headerText } from '../../assets/styles';
import { profileStyle as style } from '../../assets/styles/tabs';
import { tabHeader as Header } from '../common';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import colors from '../../assets/colors';
import { AuthContext } from '../reducer';
import ImagePicker from 'react-native-image-picker';
import { formatPhoneNumber } from '../utils';

const options = {
  title: 'Pick a image',
  base64: true,
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

const Profile = () => {
  const { state } = useContext(AuthContext);

  const [image, setimage] = useState(null);

  const uploadImage = () => {
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
      } else if (response.error) {
      } else if (response.customButton) {
      } else {
        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };

        setimage(response.uri);
      }
    });
  };

  return (
    <View style={style.container}>
      <ScrollView
        contentContainerStyle={style.container}
        showsVerticalScrollIndicator={false}
      >
        <Header>
          <Text style={headerText}>Profile</Text>
        </Header>
        <View style={style.imageView}>
          <Image
            style={style.image}
            source={{
              uri: image || state.user.image_url,
            }}
          />

          <TouchableOpacity onPress={uploadImage}>
            <View style={style.label}>
              <Icon name="upload" color="white" size={20}></Icon>
              <Text style={style.labelText}>Upload pic</Text>
            </View>
          </TouchableOpacity>
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
            <View style={style.icon}>
              <Icon name="cake-variant" color={colors.primary} size={30} />
              <Text style={style.date}>Nov 10, 2020</Text>
            </View>
          </View>
        </View>
        <View style={style.infoView}>
          <View style={style.body}>
            <Text style={style.heading}>Contact Info</Text>
            <View style={style.icon}>
              <Icon name="email-newsletter" color={colors.primary} size={30} />
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
  );
};

export { Profile };
