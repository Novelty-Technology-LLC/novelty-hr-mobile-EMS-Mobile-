import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { requestWithImageStyle as style } from "../../../assets/styles";
import colors from "../../../assets/colors";
import { AppIcon } from "../../common";
import getDay from "../../utils/getDay";
import getName from "../../utils/getName";
import CustomImage from "../../common/image";
import { getLeaveOption } from "../../utils/getLeaveType";

const RequestWithImage = ({ item, onPress }: any) => {
  let { dayRange } = getDay(item);
  let { name } = getName(item);
  const leave_option = getLeaveOption(item?.leave_option);

  return (
    <TouchableOpacity onPress={() => onPress && onPress()}>
      <View style={style.row}>
        <CustomImage style={style.image} image={item?.user?.image_url} />

        <View>
          <Text style={style.name}>{name}</Text>
          <Text style={style.type}>
            <Text> {item.type}</Text>
            {leave_option !== "FULL DAY" && (
              <Text style={style.option}> {` (${leave_option})`}</Text>
            )}
          </Text>
          <View style={style.date}>
            <AppIcon name="calendar" size={18} color={colors.secondary} />
            <Text style={style.datetype}>{dayRange}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default RequestWithImage;
