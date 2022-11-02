import React, { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import State from "../../components/leave_screen/state";
import {
  cardStyle,
  headerTxtStyle,
  listingStyle,
  requestStyle,
  theme,
} from "../../../assets/styles";
import { profileStyle as style } from "../../../assets/styles/tabs";
import CustomImage from "../../common/image";
import colors from "../../../assets/colors";
import normalize from "react-native-normalize";
import { AppIcon } from "../../common";
import { shoutoutDetailStyles } from "../../../assets/styles/common/shoutoutDetail.style";
import { navigate } from "../../utils/navigation";
import { RouteNames } from "../../constant/route_names";
import ShoutoutSVG from "../../../assets/images/shoutout.svg";
import { employeeListingStyles as styles } from "../../../assets/styles/dashboard/employeeListing.styles";

const EmployeeListingCard = ({ index, item, onPress }: any) => {
  return (
    <View
      key={index}
      style={[
        listingStyle.container,
        {
          borderBottomWidth: item.length - 1 === index ? 0 : 1,
        },
      ]}
    >
      <TouchableOpacity
        onPress={onPress}
        style={styles.employeeDetailContainer}
      >
        {/* Image */}
        <View style={{ marginRight: theme.size.lg }}>
          <CustomImage style={style.headerImage} image={item.image} />
        </View>

        {/* Details */}
        <View style={{ flex: 1 }}>
          {/* Name */}
          <Text style={cardStyle.titleText} numberOfLines={1}>
            {item?.title}
          </Text>

          {/* Designation */}
          <View style={cardStyle.icon}>
            <View style={styles.employeeDetailContainer}>
              <AppIcon
                name="card-account-details"
                color={colors.fontGrey}
                size={normalize(12)}
                style={{ marginRight: normalize(5) }}
              />

              <Text style={cardStyle.subTitleText}>{item?.subTitle}</Text>
            </View>
          </View>

          {/* Work Shift */}
          {item?.work_shift && (
            <View style={styles.employeeDetailContainer}>
              <AppIcon
                name="timetable"
                color={colors.fontGrey}
                size={normalize(12)}
                style={{ marginRight: normalize(5) }}
              />
              <Text
                style={cardStyle.subTitleText}
              >{`${item?.work_shift}`}</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>

      {/* Shouout  */}
      <TouchableOpacity
        onPress={() => navigate(RouteNames.createShoutout, item)}
        style={{
          marginLeft: normalize(theme.size.normal),
        }}
      >
        <ShoutoutSVG />
      </TouchableOpacity>
    </View>
  );
};
export { EmployeeListingCard };
