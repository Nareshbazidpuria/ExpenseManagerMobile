import React from 'react';
import { View, ScrollView, Dimensions, Text } from 'react-native';
import { BarChart, LineChart, PieChart } from 'react-native-gifted-charts';

const w = Dimensions.get('window').width - 24;

export default function ChartsScreen() {
  const lineData = [
    { value: 20 },
    { value: 45 },
    { value: 28 },
    { value: 80 },
    { value: 99 },
    { value: 43 },
  ];

  const barData = [
    { value: 14, label: 'Jan' },
    { value: 28, label: 'Feb' },
    { value: 18, label: 'Mar' },
    { value: 36, label: 'Apr' },
    { value: 22, label: 'May' },
    { value: 40, label: 'Jun' },
  ];

  const pieData = [
    { value: 40, color: '#4F46E5', text: 'A' },
    { value: 25, color: '#10B981', text: 'B' },
    { value: 20, color: '#F59E0B', text: 'C' },
    { value: 15, color: '#EF4444', text: 'D' },
  ];

  return (
    <ScrollView contentContainerStyle={{ padding: 12 }}>
      <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 8 }}>
        Line
      </Text>
      <View
        style={{
          backgroundColor: '#fff',
          borderRadius: 16,
          padding: 12,
          elevation: 2,
        }}
      >
        <LineChart
          data={lineData}
          width={w}
          height={220}
          isAnimated
          thickness={3}
          hideRules
          hideDataPoints={false}
          initialSpacing={12}
          spacing={36}
          color1="#6366F1"
          dataPointsColor1="#6366F1"
          yAxisTextStyle={{ color: '#64748B' }}
          xAxisLabelTextStyle={{ color: '#64748B' }}
        />
      </View>

      <Text style={{ fontSize: 18, fontWeight: '600', marginVertical: 12 }}>
        Bar
      </Text>
      <View
        style={{
          backgroundColor: '#fff',
          borderRadius: 16,
          padding: 12,
          elevation: 2,
        }}
      >
        <BarChart
          data={barData}
          width={w}
          height={220}
          barWidth={28}
          frontColor="#10B981"
          xAxisColor={'#E5E7EB'}
          yAxisColor={'#E5E7EB'}
          xAxisLabelTextStyle={{ color: '#64748B' }}
          yAxisTextStyle={{ color: '#64748B' }}
          isAnimated
          animationDuration={600}
          roundedTop
        />
      </View>

      <Text style={{ fontSize: 18, fontWeight: '600', marginVertical: 12 }}>
        Pie
      </Text>
      <View
        style={{
          backgroundColor: '#fff',
          borderRadius: 16,
          padding: 12,
          elevation: 2,
          alignItems: 'center',
        }}
      >
        <PieChart
          data={pieData}
          donut
          showText
          textColor="#111827"
          focusOnPress
          radius={100}
          innerRadius={60}
          centerLabelComponent={() => (
            <View style={{ alignItems: 'center' }}>
              <Text style={{ fontWeight: '700' }}>Total</Text>
              <Text style={{ color: '#6B7280' }}>100%</Text>
            </View>
          )}
        />
      </View>
    </ScrollView>
  );
}
