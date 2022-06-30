import React from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { View, Text, Linking, TouchableOpacity } from "react-native";
import { SmallHeader } from ".";
import colors from "../../assets/colors";
import { profileStyle as style } from "../../assets/styles/tabs";
import { formatPhoneNumber } from "../utils";
import { CustomText } from "../components/text";
import normalize from "react-native-normalize";
import { fonts } from "../../assets/styles/theme";
import moment from "moment";

<<<<<<< HEAD
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
          <Text style={style.date}>{user?.birth_date}</Text>
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
=======
const ProfileInfoComponent = ({
  user,
  chekUserInfo = null,
}: {
  user: any;
  chekUserInfo?: any;
}) => {
  return (
    <View style={{ top: normalize(50) }}>
      <CustomText
        text={user?.first_name + " " + user.last_name}
        style={{
          color: "black",
          paddingTop: 5,
          textAlign: "center",
          fontSize: 15,
          // fontWeight: "bold",
          fontFamily: fonts.PoppinsSemibold,
        }}
      />
      <CustomText
        text={user.designation}
        style={{
          color: "#8D8D8D",
          textAlign: "center",
          fontSize: 15,
          // fontWeight: "bold",
          fontFamily: fonts.poppinsMedium,
        }}
      />
      <View style={{ ...style.infoView }}>
        <View style={style.body}>
          <SmallHeader text="Personal Information" />
>>>>>>> 70fe053ab2a29314f99bcfd44c1ef9c73805e174
          <TouchableOpacity
            disabled={
              chekUserInfo != null
                ? user.id !== chekUserInfo.id
                  ? false
                  : true
                : true
            }
            onPress={() => {
              if (chekUserInfo != null) {
                if (user.id !== chekUserInfo.id) {
                  Linking.openURL(`mailto:${user.email}?subject=Subject to:`);
                }
              }
            }}
          >
            <View style={style.icon}>
              <Icon name="email-newsletter" color={colors.primary} size={25} />
              <Text style={style.text}>{user.email}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            disabled={
              chekUserInfo != null
                ? user.id !== chekUserInfo.id
                  ? false
                  : true
                : true
            }
            onPress={() => {
              if (chekUserInfo != null) {
                if (user.id !== chekUserInfo.id) {
                  Linking.openURL(`tel:${user.phone}`);
                }
              }
            }}
          >
            <View style={style.icon}>
              <Icon name="phone" color={colors.primary} size={25} />
              <Text style={style.text}>{formatPhoneNumber(user.phone)}</Text>
            </View>
          </TouchableOpacity>

          <View style={style.icon}>
            <Icon name="human-male-female" color={colors.primary} size={25} />
            <Text style={style.gender}>{user.gender}</Text>
          </View>
          {user.birth_date && (
            <View style={style.icon}>
              <Icon name="cake-variant" color={colors.primary} size={25} />
              <Text style={style.date}>
                {moment(user.birth_date).format("LL")}
              </Text>
            </View>
          )}
          {user.blood_group && (
            <View style={style.icon}>
              <Icon name="water" color={colors.primary} size={25} />
              <Text style={style.text}>{user?.blood_group}</Text>
            </View>
          )}
        </View>
      </View>
      <View style={style.infoView}></View>
      <View style={style.infoView}>
        <View style={style.body}>
          <SmallHeader text="Employee Information" />

          <View style={style.icon}>
            <Icon
              name="card-account-details"
              color={colors.primary}
              size={25}
            />
            <Text style={style.text}>{user?.employee_id}</Text>
          </View>

          <View style={style.icon}>
            <Icon name="location-enter" color={colors.primary} size={25} />
            <Text style={style.text}>{user.join_date}</Text>
          </View>

          {/* <View style={style.icon}>
            <Icon name="account-tie" color={colors.primary} size={25} />
            <Text style={style.designation}>{user.designation}</Text>
          </View> */}
        </View>
      </View>
    </View>
  );
};

export { ProfileInfoComponent };
