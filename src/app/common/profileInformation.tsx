import React from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { View, Text, Linking } from 'react-native'
import { SmallHeader } from '.'
import colors from '../../assets/colors'
import { profileStyle as style } from '../../assets/styles/tabs'
import { formatPhoneNumber } from '../utils'
import { TouchableOpacity } from 'react-native-gesture-handler'

const ProfileInfoComponent = ({ user }: { user: any }) => (
  <>
    <View style={style.infoView}>
      <View style={style.body}>
        <SmallHeader text="Personal Information" />
        <View style={style.icon}>
          <Icon name="account-circle" color={colors.primary} size={25} />
          <Text style={style.text}>
            {user?.first_name + ' ' + user.last_name}
          </Text>
        </View>
        <View style={style.icon}>
          <Icon name="human-male-female" color={colors.primary} size={25} />
          <Text style={style.gender}>{user.gender}</Text>
        </View>
        <View style={style.icon}>
          <Icon name="cake-variant" color={colors.primary} size={25} />
          <Text style={style.date}>{user.birth_date}</Text>
        </View>
        {user.blood_group && (
          <View style={style.icon}>
            <Icon name="water" color={colors.primary} size={25} />
            <Text style={style.text}>{user?.blood_group}</Text>
          </View>
        )}
      </View>
    </View>
    <View style={style.infoView}>
      <View style={style.body}>
        <SmallHeader text="Contact Information" />
        <TouchableOpacity
          onPress={() =>
            Linking.openURL(
              `mailto:${user.email}?subject=Subject to:&body=write your query`,
            )
          }
        >
          <View style={style.icon}>
            <Icon name="email-newsletter" color={colors.primary} size={25} />
            <Text style={style.text}>{user.email}</Text>
          </View>
        </TouchableOpacity>
        <View style={style.icon}>
          <TouchableOpacity
            onPress={() => Linking.openURL(`tel:${user.phone}`)}
          >
            <Icon name="phone" color={colors.primary} size={25} />
          </TouchableOpacity>
          <Text style={style.text}>{formatPhoneNumber(user.phone)}</Text>
        </View>
      </View>
    </View>
    <View style={style.infoView}>
      <View style={style.body}>
        <SmallHeader text="Employee Information" />

        <View style={style.icon}>
          <Icon name="card-account-details" color={colors.primary} size={25} />
          <Text style={style.text}>{user?.employee_id}</Text>
        </View>

        <View style={style.icon}>
          <Icon name="location-enter" color={colors.primary} size={25} />
          <Text style={style.text}>{user.join_date}</Text>
        </View>

        <View style={style.icon}>
          <Icon name="account-tie" color={colors.primary} size={25} />
          <Text style={style.designation}>{user.designation}</Text>
        </View>
      </View>
    </View>
  </>
)

export { ProfileInfoComponent }
