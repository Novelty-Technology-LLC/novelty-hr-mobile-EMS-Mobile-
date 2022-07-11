import React, { useContext, useEffect, useState } from 'react'
import {
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from 'react-native'
import { headerTxtStyle, listingStyle } from '../../../assets/styles'
import { getRequest } from '../../services'
import { header as Header } from '../../common'
import { ProfileInfoComponent } from '../../common/profileInformation'
import { ListPlaceholder } from '../../components/loader/listPlaceHolder'
import {
  profileStyle,
  profileStyle as style,
} from '../../../assets/styles/tabs'
import normalize from 'react-native-normalize'
import colors from '../../../assets/colors'
import { AuthContext } from '../../reducer'
import { useNavigation } from '@react-navigation/native'

const EmployeeDetail = (props: any) => {
  const [data, setData] = useState<any>({})
  const [loading, setLoading] = useState<any>(true)
  const params = props.route.params
  const { state, dispatch }: any = useContext(AuthContext)
  const [onLoadImage, setLoadImage] = useState(true)
  const navigation = useNavigation<any>()
  const imageLoading = () => {
    setLoadImage(false)
  }
  useEffect(() => {
    ; (async () => {
      try {
        console.log(params.id);

        const id = params.id
        let response = await getRequest(`user/${id}`, {})
        console.log(response);



        setData(response)
        setLoading(false)
      } catch (error) { }
    })()
  }, [])

  return (
    <View style={listingStyle.mainContainer}>
      <Header icon={true}>
        <View style={headerTxtStyle.main}>
          <Text style={headerTxtStyle.headerText}>{params.name}</Text>
          {/* <View
            style={{
              marginRight: normalize(20),
            }}
          ></View> */}
        </View>
      </Header>
      {loading ? (
        <ListPlaceholder />
      ) : (
        <ScrollView
          style={profileStyle.scrollStyle}
          showsVerticalScrollIndicator={false}
        >
          <View style={profileStyle.topContainer}></View>
          <View style={profileStyle.infoStyle}>
            <ProfileInfoComponent user={data ?? data} chekUserInfo={state.user} />
          </View>
          <View style={[style.imageWrapper, style.profileContainerWrapper]}>
            <Image
              style={[style.image, style.profileImageWrapper]}
              source={
                onLoadImage
                  ? { uri: params.image }
                  : require('../../../assets/images/employee.png')
              }
              onPartialLoad={() => imageLoading()}
              onError={(error) => imageLoading()}
            />
            {/* <View style={[style.imageWrappers, style.iconCammerWrapper]}>
              <Icon name="camera" color="white" size={20}></Icon>
            </View> */}
          </View>
        </ScrollView>
      )}
    </View>
  )
}

export { EmployeeDetail }
