import React from "react";
import { Dimensions, Text } from "react-native";
import colors from "../../../assets/colors";
import { LineChart } from "react-native-chart-kit";
import normalize from "../../utils/normalize";

const screenWidth = Dimensions.get("window").width;

const LineChartComponent = (props: any) => {
  return (
    <LineChart
      withHorizontalLabels={false}
      data={props.data}
      width={props.days === 5 ? screenWidth : screenWidth - 8}
      height={256}
      segments={1}
      chartConfig={{
        propsForBackgroundLines: {
          strokeDasharray: "",
          stroke: "#D3D3D3",
        },

        strokeWidth: 2,
        backgroundColor: colors.white,
        backgroundGradientFrom: colors.white,
        backgroundGradientTo: colors.white,
        decimalPlaces: 2, // optional, defaults to 2dp
        color: () => `rgb(191, 139, 89)`,
        labelColor: () => `rgb(102, 102, 102)`,
        style: {
          backgroundColor: colors.red,
        },
        propsForDots: {
          r: "5",
          strokeWidth: "0.7",
          stroke: "#ffffff",
        },
      }}
      bezier
      style={{
        marginVertical: normalize(8),
        backgroundColor: colors.white,
        paddingRight: normalize(11),
        marginRight: normalize(5),
      }}
      renderDotContent={({ x, y, index, indexData }: any) => {
        return (
          <Text
            style={{
              position: "absolute",
              paddingTop: y - 16,
              paddingLeft: x - 6,
              color: "#383838",
              fontSize: normalize(10),
            }}
          >
            {parseInt(indexData) + " hrs"}
          </Text>
        );
      }}
    />
  );
};

export { LineChartComponent };
