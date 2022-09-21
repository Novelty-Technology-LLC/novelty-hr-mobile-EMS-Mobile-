import React, { useEffect, useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";
import State from "../../components/leave_screen/state";
import {
  cardStyle,
  headerTxtStyle,
  listingStyle,
  requestStyle,
} from "../../../assets/styles";
import { useWindowDimensions } from "react-native";
import { RenderHtmlComponent } from "../../common/renderHtml";
import { getShortDate } from "../../utils";
import { profileStyle as style } from "../../../assets/styles/tabs";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import colors from "../../../assets/colors";
import normalize from "react-native-normalize";
import CustomImage from "../../common/image";

const ListingCard = ({ index, listLength, item, module, sa }: any) => {
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
          <Text style={cardStyle.titleText}>
            {item.title && item.title.length > 40
              ? item.title.slice(0, 40) + "..."
              : item.title}
          </Text>

          {module == "Announcements" && (
            <Text style={[cardStyle.dateText, { fontSize: 11 }]}>
              {getShortDate(item.date)}
            </Text>
          )}
        </View>
        {module == "Announcements" ? (
          <RenderHtmlComponent htmlData={item.subTitle} />
        ) : (
          <View style={cardStyle.icon}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                alignSelf: "center",
              }}
            >
              <Icon
                name="card-account-details"
                color={colors.fontGrey}
                size={normalize(12)}
              />
              <Text style={cardStyle.subTitleText}>{item?.subTitle}</Text>
            </View>
            {item?.work_shift && (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  alignSelf: "center",
                }}
              >
                <Icon
                  name="timetable"
                  color={colors.fontGrey}
                  size={normalize(12)}
                />
                <Text
                  style={cardStyle.subTitleText}
                >{`${item?.work_shift}`}</Text>
              </View>
            )}
          </View>
        )}
      </View>
      {module == "employeeList" && (
        <CustomImage style={style.headerImage} image={item.image} />
      )}
      <View>
        <State state={item?.status} />
      </View>
    </View>
  );
};
export { ListingCard };
