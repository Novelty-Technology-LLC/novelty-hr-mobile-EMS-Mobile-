import { smallHeaderStyle as style } from "../../assets/styles";
import React from "react";
import { Text, View } from "react-native";

const SmallHeader = ({
  text,
  history,
  timelog = false,
  showLine = true,
}: {
  text: string;
  history?: Boolean;
  timelog?: boolean;
  showLine?: boolean;
}) => {
  return (
    <View
      style={
        !history
          ? style.subcontainer
          : timelog
          ? [style.subcontainer, style.historyTimelogContainer]
          : [style.subcontainer, style.historyContainer]
      }
    >
      <Text style={style.header}>{text}</Text>
      {showLine && <View style={style.line}></View>}
    </View>
  );
};

export { SmallHeader };
