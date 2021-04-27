import React from 'react';
import { Dimensions, Text } from 'react-native';
import colors from '../../../assets/colors';
import { LineChart } from 'react-native-chart-kit';
import normalize from '../../utils/normalize';

const screenWidth = Dimensions.get('window').width;

const LineChartComponent = (props: any) => {
  return (
    <LineChart
      xAxisLabel=""
      withHorizontalLabels={false}
      data={props.data}
      width={screenWidth - 40}
      height={256}
      segments={2}
      chartConfig={{
        propsForBackgroundLines: {
          //   strokeDasharray: '', solid background lines with no dashes
          //   stroke: '#D3D3D3',
        },

        strokeWidth: 2,
        backgroundColor: colors.white,
        backgroundGradientFrom: colors.white,
        backgroundGradientTo: colors.white,
        decimalPlaces: 2, // optional, defaults to 2dp
        color: (opacity = 1) => `rgb(191, 139, 89)`,
        labelColor: (opacity = 1) => `rgb(102, 102, 102)`,
        style: {
          backgroundColor: colors.white,
        },
        propsForDots: {
          r: '5',
          strokeWidth: '2',
          stroke: '#ffffff',
        },
      }}
      bezier
      style={{
        marginVertical: 8,
        borderRadius: 16,
        backgroundColor: colors.white,
        paddingRight: normalize(15),
        marginRight: 5,
      }}
      renderDotContent={({ x, y, index, indexData }) => {
        return (
          <Text
            style={{
              position: 'absolute',
              top: y,
              left: x,
              color: '#383838',
              fontSize: 10,
            }}
          >
            {parseInt(indexData) + ' hrs'}
          </Text>
        );
      }}
    />
  );
};

export { LineChartComponent };
