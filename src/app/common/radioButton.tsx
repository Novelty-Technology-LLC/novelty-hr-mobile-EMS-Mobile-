import { Radio, RadioGroup } from "@ui-kitten/components";
import React from "react";
import { FlatList, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { customRadioButtonStyle } from "../../assets/styles/common/radioButton.style";
import { requestLeave } from "../../assets/styles/request_leave_screen/request_leave.styles";
import normalize from "../utils/normalize";
import { SmallHeader } from "./smallHeader";

export const CustomRadioButton = ({
  dataList,
  title,
  setSelectedIndex,
  selectedIndex,
}: {
  dataList: any;
  title: any;
  setSelectedIndex: any;
  selectedIndex: any;
}) => {
  const [checked, setChecked] = React.useState(false);

  return (
    <View style={customRadioButtonStyle.container}>
      <SmallHeader text={title} />

      <RadioGroup
        selectedIndex={selectedIndex}
        style={customRadioButtonStyle.body}
        onChange={(index) => setSelectedIndex(index)}
      >
        {dataList.map((item: any) => (
          <Radio>{item.title}</Radio>
        ))}
      </RadioGroup>
    </View>
  );
};
