import React, { useEffect, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import State from "../../components/leave_screen/state";
import {
  cardStyle,
  headerTxtStyle,
  listingStyle,
  requestStyle,
  theme,
} from "../../../assets/styles";
import { useWindowDimensions } from "react-native";
import { RenderHtmlComponent } from "../../common/renderHtml";
import { getShortDate } from "../../utils";
import { profileStyle as style } from "../../../assets/styles/tabs";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import colors from "../../../assets/colors";
import normalize from "react-native-normalize";
import CustomImage from "../../common/image";
import { getLeaveOption } from "../../utils/getLeaveType";
import Svg, { Path } from "react-native-svg";
import Shoutout from "./../../../assets/images/shoutout.svg";
import { navigate } from "../../utils/navigation";
const ListingCard = ({ index, listLength, item, module, sa, state }: any) => {
  const [se, us] = useState([{ src: item.image, errored: false }]);

  return (
    <View
      key={index}
      style={[
        listingStyle.container,
        {
          borderBottomWidth: listLength - 1 === index ? 0 : 1,
        },
      ]}
    >
      {module == "employeeList" && (
        <View style={{ marginRight: theme.size.lg }}>
          <CustomImage style={style.headerImage} image={item.image} />
        </View>
      )}
      <View style={{ flex: 1 }}>
        <View
          style={{
            flex: 1,
            width: "100%",

            flexDirection: "row",
            justifyContent: "space-between",
            paddingRight: 10,
          }}
        >
          {module == "Announcements" ? (
            <Text style={cardStyle.titleText}>
              {state?.title && state?.title.length > 40
                ? state?.title.slice(0, 40) + "..."
                : state?.title}
            </Text>
          ) : (
            <Text style={cardStyle.titleText}>
              {item?.title && item?.title?.length > 40
                ? item?.title.slice(0, 40) + "..."
                : item?.title}
            </Text>
          )}
          {module == "Announcements" && (
            <Text style={[cardStyle.dateText, { fontSize: 11 }]}>
              {getShortDate(state?.date)}
            </Text>
          )}
        </View>
        {module == "Announcements" ? (
          <RenderHtmlComponent htmlData={state?.html} />
        ) : (
          <View style={cardStyle.icon}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              {module === "employeeList" && (
                <Icon
                  name="card-account-details"
                  color={colors.fontGrey}
                  size={normalize(12)}
                  style={{ marginRight: normalize(5) }}
                />
              )}
              <Text style={cardStyle.subTitleText}>{item?.subTitle}</Text>
            </View>
            {item?.work_shift && (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Icon
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
            {item?.leave_option && item?.leave_option !== "FULL DAY" && (
              <Text style={cardStyle.subTitleText}>
                {getLeaveOption(item?.leave_option)}
              </Text>
            )}
          </View>
        )}
      </View>
      {module == "employeeList" && (
        <View style={{ marginRight: theme.size.lg }}>
          <TouchableOpacity onPress={() => navigate("addAnnouncement")}>
            <Image
              source={require("./../../../assets/images/shoutout.png")}
              style={{
                width: normalize(20),
                height: normalize(21),
                marginTop: normalize(10),
              }}
            />
          </TouchableOpacity>
        </View>
      )}
      <View>
        <State state={item?.status} />
      </View>
    </View>
  );
};
export { ListingCard };
