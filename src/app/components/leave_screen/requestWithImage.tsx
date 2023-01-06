import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { requestWithImageStyle as style } from "../../../assets/styles";
import colors from "../../../assets/colors";
import { AppIcon } from "../../common";
import getDay from "../../utils/getDay";
import getName from "../../utils/getName";
import CustomImage from "../../common/image";
import { getLeaveOption } from "../../utils/getLeaveType";

const RequestWithImage = ({ item, onPress, type }: any) => {
  console.log("itavsjdbasjdbjlasd", item);

  let { dayRange } = getDay(item);
  let { name } = getName(item);
  const work_option = getLeaveOption(item?.leave_option);

  return (
    <TouchableOpacity onPress={() => onPress && onPress()}>
      <View style={style.row}>
        <CustomImage style={style.image} image={item?.user?.image_url} />

        <View>
          <Text style={style.name}>{name}</Text>
          <Text style={style.type}>
            {type !== "WFH" && <Text> {type}</Text>}
            {work_option && (
              <Text style={style.option}> {`${work_option}`}</Text>
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
