import React, { useContext, useRef, useState } from 'react'
import BottomSheet from 'react-native-gesture-bottom-sheet'

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
} from 'react-native'
import { fonts, headerTxtStyle, theme } from '../../assets/styles'
import { profileStyle, profileStyle as style } from '../../assets/styles/tabs'
import { showToast, tabHeader as Header } from '../common'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler'
import colors from '../../assets/colors'
import { AuthContext } from '../reducer'
import ImageCropper from 'react-native-image-crop-picker'
import { updateImage } from '../services'
import { MenuProvider } from 'react-native-popup-menu'

import normalize from 'react-native-normalize'
import { storeToken, removeToken, removeUser, setUser } from '../utils'
import { ProfileInfoComponent } from '../common/profileInformation'
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu'
import RBSheet from 'react-native-raw-bottom-sheet'
import { CustomText } from '../components/text'
import Toast from 'react-native-toast-message'
import { TermPolicy } from '../common/termPolicy'
import { useNavigation } from '@react-navigation/native'
import { CustomDivider } from '../common/divider'
import CustomFullScreenImage from '../common/CustomFullScreenImage'
import { EmployeeDetail } from './dashboard/employeeDetail'
const Profile = ({ navigation }: any) => {
  const { state, dispatch } = useContext(AuthContext)
  const [image, setimage] = useState(null)

  const [loading, setloading] = useState(false)

  const cleanImage = () =>
    ImageCropper.clean()
      .then(() => {
        console.log('removed all tmp images from tmp directory')
      })
      .catch((e) => {})

  const updateProfileImage = (image: any, data?: any) => {
    setimage(image)
    if (data?.image_url) {
      dispatch({
        type: 'SET_IMAGE',
        payload: data?.image_url,
      })
      menuRef.current.show()

    }

  }
  const refRBSheet = useRef<any>(null)
  const menuRef = useRef<any>(null)

  const menuForBottomSheet = ({
    title,
    iconName,
    onPress,
  }: {
    title: string
    iconName: string
    onPress: Function
  }) => {
    return (
      <View>
        <Pressable style={style.bottomSheetMenu} onPress={onPress()}>
          <Icon
            name={iconName}
            color={style.bottomSheetMenuIcon.color}
            size={15}
          ></Icon>

          <CustomText text={title} style={style.bottomSheetMenuTitle} />
        </Pressable>
      </View>
    )
  }
  const confirmForBottomSheet = ({
    title,
    iconName,
    onPress,
  }: {
    title: string
    iconName: string
    onPress: Function
  }) => {
    return (
      <View>
        <Pressable style={style.bottomSheetMenu} onPress={onPress()}>
          <Icon
            name={iconName}
            color={style.bottomSheetMenuIcon.color}
            size={15}
          ></Icon>

          <CustomText text={title} style={style.bottomSheetMenuTitle} />
        </Pressable>
      </View>
    )
  }
  const callbackForUploadImage = (image: any) => {
    updateProfileImage(image)
  }
  const uploadImage = () => {
    ImageCropper.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: true,
      compressImageQuality: 0.8,
      cropperCircleOverlay: true,
    }).then((image) => {
      callbackForUploadImage(image)
      refRBSheet.current.close()

      // confirm()
    }).finally(()=>{

    })
  }
  const openCamera = () => {
    ImageCropper.openCamera({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: true,
      compressImageQuality: 0.8,
      cropperCircleOverlay: true,
    }).then((image) => {
      refRBSheet.current.close()

      callbackForUploadImage(image)
      menuRef.current.show()
      // confirm()
    })
  }

  const confirm = () => {
    menuRef.current.close()
    setloading(true)
    updateImage(state.user.id, {
      data: image.data,
      name: image.path.split('/').pop(),
      type: image.mime,
    })
      .then((data) => {
        removeToken()
        storeToken(JSON.stringify(data))
        removeUser()
        setUser(data)
        setloading(false)
        updateProfileImage({ ...image, visible: false }, data)
        showToast('Image uploaded')
        cleanImage()
      })
      .catch((err) => {
        setloading(false)
        cleanImage()
        showToast('Something went wrong', false)
      })
  }

  let uri = image ? image?.path : state?.user?.image_url
  const [oldimage, setoldimage] = useState(state.image_url)
  const cancel = () => {
    setloading(false)
    menuRef.current.close()
    setimage(oldimage)
  }
  return state?.user ? (
    <>
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
              cache: 'force-cache',
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
                  title: 'Upload from library',
                  iconName: 'upload',
                  onPress: () => uploadImage,
                })}
                {menuForBottomSheet({
                  title: 'Take a photo',
                  iconName: 'camera',
                  onPress: () => openCamera,
                })}
              </View>
            </BottomSheet>
            <BottomSheet hasDraggableIcon ref={menuRef} height={normalize(150)}>
              <View>
                {confirmForBottomSheet({
                  title: 'Confirm',
                  iconName: 'check',
                  onPress: () => confirm,
                })}
                {confirmForBottomSheet({
                  title: 'Close',
                  iconName: 'close',
                  onPress: () => cancel,
                })}
              </View>
            </BottomSheet>
          </View>
        </View>
         
      </View>
      {loading ? (
        <View style={style.loader}>
          <ActivityIndicator
            size="large"
            color={colors.primary}
            style={{ marginTop: normalize(10) }}
          />
        </View>
      ) : null}
    </ScrollView>
    <View
            style={{
              backgroundColor:"white",
            
             

              justifyContent: 'center',
            }}
          >
            <TermPolicy />
          </View>
    </>
  ) : (
    <></>
  )

}

export { Profile }

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
