import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import {Text} from 'react-native-paper';
import {LineChart} from 'react-native-chart-kit';

const chartConfig = {
  backgroundColor: '#252424',
  backgroundGradientFrom: '#252424',
  backgroundGradientTo: '#252424',
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  propsForDots: {
    r: '6',
    strokeWidth: '2',
    stroke: '#ffa726',
  },
  style: {
    borderRadius: 16,
    padding: 100, // set padding for the chart
  },
};

const data = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      data: [20, 45, 28, 80, 99, 43],
      color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
      strokeWidth: 2,
    },
  ],
};

const CustomLineChart = ({chartTitle}) => {
  const screenWidth = Dimensions.get('window').width - 50;

  return (
    <View>
      <Text
        variant="titleLarge"
        style={{textAlign: 'center', marginBottom: 10}}>
        {chartTitle}
      </Text>
      <View
        style={{
          padding: 10,
          borderRadius: 20,
          marginLeft: 10,
          marginRight: 10,
          backgroundColor: '#252424',
        }}>
        <LineChart
          data={data}
          width={screenWidth}
          height={220}
          chartConfig={chartConfig}
          style={{
            marginVertical: 0,
            marginTop: 3,
            borderRadius: 1,
          }}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({});
export default CustomLineChart;
