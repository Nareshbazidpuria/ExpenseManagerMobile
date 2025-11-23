// // // import { Text, View } from 'react-native';
// // // import React from 'react';
// // // import TopBar from '../components/TopBar';

// // // const InsightsScreen: React.FC = () => {
// // //   return (
// // //     <View className="flex-1">
// // //       <TopBar name="Insights" />
// // //       <View className="flex-1 items-center justify-center">
// // //         <Text>This feature is under development</Text>
// // //       </View>
// // //     </View>
// // //   );
// // // };
// // // export default InsightsScreen;
// // import React from 'react';
// // import { View, ScrollView, Text, useWindowDimensions } from 'react-native';
// // import { LineChart, BarChart, PieChart } from 'react-native-gifted-charts';
// // import TopBar from '../components/TopBar';
// // import { primary } from '../utils/global';

// // export default function ChartsScreen() {
// //   const { width } = useWindowDimensions();
// //   const chartWidth = width - 32; // accounts for padding (p-3 → 12px left + 12px right = 24, plus safety margin)

// //   const lineData = [
// //     { value: 20 },
// //     { value: 45 },
// //     { value: 28 },
// //     { value: 80 },
// //     { value: 99 },
// //     { value: 43 },
// //   ];

// //   const barData = [
// //     { value: 14, label: 'Jan' },
// //     { value: 28, label: 'Feb' },
// //     { value: 18, label: 'Mar' },
// //     { value: 36, label: 'Apr' },
// //     { value: 22, label: 'May' },
// //     { value: 40, label: 'Jun' },
// //   ];

// //   const pieData = [
// //     { value: 40, color: primary, text: 'A' },
// //     { value: 25, color: '#34d399', text: 'B' },
// //     { value: 20, color: '#fbbf24', text: 'C' },
// //     { value: 15, color: '#ef4444', text: 'D' },
// //   ];

// //   return (
// //     <>
// //       <TopBar name="Insights" />
// //       <ScrollView className="flex-1 bg-gray-100 p-3">
// //         {/* Line Chart */}
// //         <Text className="text-lg font-semibold text-gray-800 mb-2">
// //           Line Chart
// //         </Text>
// //         <View className="bg-white rounded-2xl p-4 shadow-md mb-6">
// //           <LineChart
// //             data={lineData}
// //             width={chartWidth}
// //             height={220}
// //             isAnimated
// //             thickness={3}
// //             hideRules
// //             hideDataPoints={false}
// //             initialSpacing={12}
// //             spacing={36}
// //             color1={primary}
// //             dataPointsColor1={primary}
// //             yAxisTextStyle={{ color: '#6b7280' }}
// //             xAxisLabelTextStyle={{ color: '#6b7280' }}
// //           />
// //         </View>

// //         {/* Bar Chart */}
// //         <Text className="text-lg font-semibold text-gray-800 mb-2">
// //           Bar Chart
// //         </Text>
// //         {/* <View className="bg-white rounded-2xl p-4 shadow-md mb-6"> */}
// //         <BarChart
// //           data={barData}
// //           width={chartWidth}
// //           height={220}
// //           barWidth={28}
// //           frontColor={primary}
// //           xAxisColor={'#e5e7eb'}
// //           yAxisColor={'#e5e7eb'}
// //           xAxisLabelTextStyle={{ color: '#6b7280' }}
// //           yAxisTextStyle={{ color: '#6b7280' }}
// //           isAnimated
// //           animationDuration={600}
// //           roundedTop
// //         />
// //         {/* </View> */}

// //         {/* Pie Chart */}
// //         <Text className="text-lg font-semibold text-gray-800 mb-2">
// //           Pie Chart
// //         </Text>
// //         <View className="bg-white rounded-2xl p-4 shadow-md items-center">
// //           <PieChart
// //             data={pieData}
// //             donut
// //             showText
// //             textColor="#111827"
// //             focusOnPress
// //             radius={100}
// //             innerRadius={60}
// //             centerLabelComponent={() => (
// //               <View className="items-center">
// //                 <Text className="font-bold text-gray-800">Total</Text>
// //                 <Text className="text-gray-500">100%</Text>
// //               </View>
// //             )}
// //           />
// //         </View>
// //       </ScrollView>
// //     </>
// //   );
// // }

// import { useState, useRef } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   Dimensions,
//   Animated,
//   Platform,
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { BarChart, LineChart, PieChart } from 'react-native-gifted-charts';
// import TopBar from '../components/TopBar';

// const screenWidth = Dimensions.get('window').width;

// interface TooltipData {
//   visible: boolean;
//   x: number;
//   y: number;
//   title: string;
//   content: string;
//   type: 'bar' | 'line' | 'pie';
// }

// // Mock data for demonstration
// const monthlyData = [
//   { value: 1200, label: 'Jan', frontColor: '#3B82F6' },
//   { value: 1800, label: 'Feb', frontColor: '#3B82F6' },
//   { value: 1500, label: 'Mar', frontColor: '#3B82F6' },
//   { value: 2200, label: 'Apr', frontColor: '#3B82F6' },
//   { value: 1900, label: 'May', frontColor: '#3B82F6' },
//   { value: 2400, label: 'Jun', frontColor: '#3B82F6' },
//   { value: 2100, label: 'Jul', frontColor: '#3B82F6' },
//   { value: 2800, label: 'Aug', frontColor: '#3B82F6' },
//   { value: 2300, label: 'Sep', frontColor: '#3B82F6' },
//   { value: 2600, label: 'Oct', frontColor: '#3B82F6' },
//   { value: 2900, label: 'Nov', frontColor: '#3B82F6' },
//   { value: 3200, label: 'Dec', frontColor: '#10B981' },
// ];

// const dailyData = [
//   { value: 120, label: '1' },
//   { value: 180, label: '2' },
//   { value: 150, label: '3' },
//   { value: 220, label: '4' },
//   { value: 190, label: '5' },
//   { value: 240, label: '6' },
//   { value: 210, label: '7' },
//   { value: 160, label: '8' },
//   { value: 280, label: '9' },
//   { value: 200, label: '10' },
//   { value: 250, label: '11' },
//   { value: 180, label: '12' },
//   { value: 320, label: '13' },
//   { value: 190, label: '14' },
//   { value: 240, label: '15' },
// ];

// const categoryData = [
//   { value: 35, color: '#3B82F6', text: '35%', label: 'Food' },
//   { value: 20, color: '#10B981', text: '20%', label: 'Transport' },
//   { value: 15, color: '#F59E0B', text: '15%', label: 'Entertainment' },
//   { value: 20, color: '#EF4444', text: '20%', label: 'Shopping' },
//   { value: 10, color: '#8B5CF6', text: '10%', label: 'Bills' },
// ];

// export default function InsightsScreen() {
//   const [tooltip, setTooltip] = useState<TooltipData>({
//     visible: false,
//     x: 0,
//     y: 0,
//     title: '',
//     content: '',
//     type: 'bar',
//   });
//   const tooltipOpacity = useRef(new Animated.Value(0)).current;

//   const showTooltip = (
//     x: number,
//     y: number,
//     title: string,
//     content: string,
//     type: 'bar' | 'line' | 'pie',
//   ) => {
//     setTooltip({ visible: true, x, y, title, content, type });
//     Animated.timing(tooltipOpacity, {
//       toValue: 1,
//       duration: 200,
//       useNativeDriver: true,
//     }).start();
//   };

//   const hideTooltip = () => {
//     Animated.timing(tooltipOpacity, {
//       toValue: 0,
//       duration: 150,
//       useNativeDriver: true,
//     }).start(() => {
//       setTooltip(prev => ({ ...prev, visible: false }));
//     });
//   };

//   const handleBarPress = (item: any, index: number, event?: any) => {
//     const content = `Total: $${item.value}\n\n• Food: $${Math.round(
//       item.value * 0.35,
//     )}\n• Transport: $${Math.round(
//       item.value * 0.2,
//     )}\n• Shopping: $${Math.round(
//       item.value * 0.2,
//     )}\n• Entertainment: $${Math.round(
//       item.value * 0.15,
//     )}\n• Bills: $${Math.round(item.value * 0.1)}`;
//     showTooltip(50 + index * 30, 200, `${item.label} Expenses`, content, 'bar');
//   };

//   const handleLinePress = (item: any, index: number, event?: any) => {
//     const content = `Amount: $${item.value}\n\n• Lunch: $${Math.round(
//       item.value * 0.4,
//     )}\n• Transport: $${Math.round(item.value * 0.3)}\n• Coffee: $${Math.round(
//       item.value * 0.2,
//     )}\n• Other: $${Math.round(item.value * 0.1)}`;
//     showTooltip(50 + index * 18, 200, `Day ${item.label}`, content, 'line');
//   };

//   const handlePiePress = (item: any, index: number, event?: any) => {
//     const categoryDetails = {
//       Food: 'Restaurants, groceries, coffee shops',
//       Transport: 'Gas, public transport, ride-sharing',
//       Entertainment: 'Movies, games, subscriptions',
//       Shopping: 'Clothes, electronics, household items',
//       Bills: 'Utilities, phone, internet',
//     };

//     const content = `${item.value}% of total\n\nIncludes:\n${
//       categoryDetails[item.label as keyof typeof categoryDetails]
//     }\n\nAmount: $${Math.round((2840 * item.value) / 100)}`;
//     showTooltip(
//       screenWidth / 2 - 100,
//       300,
//       `${item.label} Category`,
//       content,
//       'pie',
//     );
//   };

//   return (
//     <>
//       <TopBar name="Insights" />
//       <ScrollView
//         className="flex-1 bg-white p-4"
//         showsVerticalScrollIndicator={false}
//       >
//         {/* Quick Stats */}
//         <View>
//           <Text style={styles.statsTitle}>Quick Stats</Text>
//           <View style={styles.statsGrid}>
//             <View style={styles.statCard}>
//               <Text style={styles.statValue}>$2,840</Text>
//               <Text style={styles.statLabel}>This Month</Text>
//               <Text style={styles.statChange}>+12% from last month</Text>
//             </View>
//             <View style={styles.statCard}>
//               <Text style={styles.statValue}>$94.67</Text>
//               <Text style={styles.statLabel}>Daily Average</Text>
//               <Text style={styles.statChangeNegative}>-5% from last month</Text>
//             </View>
//           </View>
//           <View style={styles.statsGrid}>
//             <View style={styles.statCard}>
//               <Text style={styles.statValue}>Food</Text>
//               <Text style={styles.statLabel}>Top Category</Text>
//               <Text style={styles.statChange}>35% of spending</Text>
//             </View>
//             <View style={styles.statCard}>
//               <Text style={styles.statValue}>23</Text>
//               <Text style={styles.statLabel}>Transactions</Text>
//               <Text style={styles.statChange}>+3 from last month</Text>
//             </View>
//           </View>
//         </View>

//         {/* Monthly Overview */}
//         <View style={styles.chartContainer}>
//           <Text style={styles.chartTitle}>Monthly Overview</Text>
//           <Text style={styles.chartSubtitle}>
//             January - December 2024 (Tap bars for details)
//           </Text>
//           <View style={styles.chartWrapper}>
//             <BarChart
//               data={monthlyData}
//               width={screenWidth - 88}
//               height={220}
//               barWidth={22}
//               spacing={8}
//               roundedTop
//               roundedBottom
//               hideRules
//               xAxisThickness={1}
//               yAxisThickness={1}
//               xAxisColor={'#E5E7EB'}
//               yAxisColor={'#E5E7EB'}
//               yAxisTextStyle={{ color: '#6B7280', fontSize: 12 }}
//               xAxisLabelTextStyle={{ color: '#6B7280', fontSize: 11 }}
//               noOfSections={4}
//               maxValue={3500}
//               onPress={handleBarPress}
//               onPressOut={Platform.OS === 'web' ? undefined : hideTooltip}
//               activeOpacity={0.7}
//             />
//           </View>
//         </View>

//         {/* Daily Trend */}
//         <View style={styles.chartContainer}>
//           <Text style={styles.chartTitle}>Current Month Trend</Text>
//           <Text style={styles.chartSubtitle}>
//             Daily expenses in December (Tap points for details)
//           </Text>
//           <View style={styles.chartWrapper}>
//             <LineChart
//               data={dailyData}
//               width={screenWidth - 88}
//               height={220}
//               spacing={18}
//               color={'#10B981'}
//               thickness={3}
//               startFillColor={'rgba(16, 185, 129, 0.3)'}
//               endFillColor={'rgba(16, 185, 129, 0.1)'}
//               startOpacity={0.9}
//               endOpacity={0.2}
//               initialSpacing={0}
//               noOfSections={4}
//               maxValue={350}
//               yAxisColor={'#E5E7EB'}
//               xAxisColor={'#E5E7EB'}
//               yAxisThickness={1}
//               xAxisThickness={1}
//               rulesType="solid"
//               rulesColor={'#F3F4F6'}
//               yAxisTextStyle={{ color: '#6B7280', fontSize: 12 }}
//               xAxisLabelTextStyle={{ color: '#6B7280', fontSize: 11 }}
//               dataPointsHeight={6}
//               dataPointsWidth={6}
//               dataPointsColor={'#10B981'}
//               textShiftY={-2}
//               textShiftX={-5}
//               textFontSize={10}
//               onPress={handleLinePress}
//               onPressOut={Platform.OS === 'web' ? undefined : hideTooltip}
//               hideDataPoints={false}
//               curved
//               areaChart
//             />
//           </View>
//         </View>

//         {/* Category Breakdown */}
//         <View style={styles.chartContainer}>
//           <Text style={styles.chartTitle}>Category Breakdown</Text>
//           <Text style={styles.chartSubtitle}>
//             Spending distribution this month (Tap slices for details)
//           </Text>
//           <View style={styles.pieChartWrapper}>
//             <PieChart
//               data={categoryData}
//               donut
//               showGradient
//               sectionAutoFocus
//               radius={90}
//               innerRadius={60}
//               innerCircleColor={'#FFFFFF'}
//               centerLabelComponent={() => {
//                 return (
//                   <View style={styles.centerLabel}>
//                     <Text style={styles.centerLabelValue}>$2,840</Text>
//                     <Text style={styles.centerLabelText}>Total</Text>
//                   </View>
//                 );
//               }}
//               onPress={handlePiePress}
//               onPressOut={Platform.OS === 'web' ? undefined : hideTooltip}
//             />
//           </View>
//           <View style={styles.legendContainer}>
//             {categoryData.map((item, index) => (
//               <View key={index} style={styles.legendItem}>
//                 <View
//                   style={[styles.legendColor, { backgroundColor: item.color }]}
//                 />
//                 <Text style={styles.legendText}>{item.label}</Text>
//                 <Text style={styles.legendValue}>{item.text}</Text>
//               </View>
//             ))}
//           </View>
//         </View>

//         <View style={styles.bottomPadding} />

//         {/* Futuristic Tooltip */}
//         {tooltip.visible && (
//           <Animated.View
//             style={[
//               styles.tooltip,
//               {
//                 left: Math.min(Math.max(tooltip.x, 20), screenWidth - 220),
//                 top: tooltip.y,
//                 opacity: tooltipOpacity,
//               },
//             ]}
//           >
//             <View style={styles.tooltipGlow} />
//             <View style={styles.tooltipContent}>
//               <View style={styles.tooltipHeader}>
//                 <View
//                   style={[
//                     styles.tooltipIndicator,
//                     { backgroundColor: getTooltipColor(tooltip.type) },
//                   ]}
//                 />
//                 <Text style={styles.tooltipTitle}>{tooltip.title}</Text>
//               </View>
//               <Text style={styles.tooltipText}>{tooltip.content}</Text>
//               <View style={styles.tooltipFooter}>
//                 <View style={styles.tooltipDots}>
//                   <View style={[styles.dot, styles.dotActive]} />
//                   <View style={styles.dot} />
//                   <View style={styles.dot} />
//                 </View>
//               </View>
//             </View>
//             <View style={styles.tooltipArrow} />
//           </Animated.View>
//         )}
//       </ScrollView>
//     </>
//   );
// }

// const getTooltipColor = (type: 'bar' | 'line' | 'pie') => {
//   switch (type) {
//     case 'bar':
//       return '#3B82F6';
//     case 'line':
//       return '#10B981';
//     case 'pie':
//       return '#8B5CF6';
//     default:
//       return '#3B82F6';
//   }
// };

// const styles = StyleSheet.create({
//   scrollView: {
//     flex: 1,
//   },
//   header: {
//     padding: 24,
//     paddingBottom: 16,
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     color: '#111827',
//     marginBottom: 4,
//   },
//   subtitle: {
//     fontSize: 16,
//     color: '#6B7280',
//   },

//   statsTitle: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#111827',
//     marginBottom: 16,
//   },
//   statsGrid: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     gap: 12,
//     marginBottom: 12,
//   },
//   statCard: {
//     backgroundColor: '#FFFFFF',
//     flex: 1,
//     // marginHorizontal: 6,
//     padding: 16,
//     borderRadius: 12,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 8,
//     elevation: 3,
//   },
//   statValue: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#111827',
//     marginBottom: 4,
//   },
//   statLabel: {
//     fontSize: 12,
//     color: '#6B7280',
//     marginBottom: 4,
//   },
//   statChange: {
//     fontSize: 12,
//     color: '#10B981',
//     fontWeight: '500',
//   },
//   statChangeNegative: {
//     fontSize: 12,
//     color: '#EF4444',
//     fontWeight: '500',
//   },
//   chartContainer: {
//     backgroundColor: '#FFFFFF',
//     marginBottom: 24,
//     borderRadius: 16,
//     padding: 20,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 8,
//     elevation: 3,
//   },
//   chartTitle: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#111827',
//     marginBottom: 4,
//   },
//   chartSubtitle: {
//     fontSize: 14,
//     color: '#6B7280',
//     marginBottom: 16,
//   },
//   chartWrapper: {
//     alignItems: 'center',
//     paddingVertical: 10,
//   },
//   pieChartWrapper: {
//     alignItems: 'center',
//     paddingVertical: 20,
//   },
//   centerLabel: {
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   centerLabelValue: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#111827',
//   },
//   centerLabelText: {
//     fontSize: 12,
//     color: '#6B7280',
//   },
//   legendContainer: {
//     marginTop: 20,
//   },
//   legendItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 8,
//   },
//   legendColor: {
//     width: 12,
//     height: 12,
//     borderRadius: 6,
//     marginRight: 12,
//   },
//   legendText: {
//     flex: 1,
//     fontSize: 14,
//     color: '#374151',
//   },
//   legendValue: {
//     fontSize: 14,
//     fontWeight: '500',
//     color: '#111827',
//   },
//   bottomPadding: {
//     height: 24,
//   },
//   tooltip: {
//     position: 'absolute',
//     width: 200,
//     zIndex: 1000,
//     elevation: 20,
//   },
//   tooltipGlow: {
//     position: 'absolute',
//     top: -4,
//     left: -4,
//     right: -4,
//     bottom: -4,
//     backgroundColor: 'rgba(59, 130, 246, 0.1)',
//     borderRadius: 16,
//     shadowColor: '#3B82F6',
//     shadowOffset: { width: 0, height: 0 },
//     shadowOpacity: 0.3,
//     shadowRadius: 12,
//     elevation: 8,
//   },
//   tooltipContent: {
//     backgroundColor: 'rgba(17, 24, 39, 0.95)',
//     borderRadius: 12,
//     padding: 16,
//     borderWidth: 1,
//     borderColor: 'rgba(59, 130, 246, 0.3)',
//     backdropFilter: 'blur(10px)',
//   },
//   tooltipHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 12,
//   },
//   tooltipIndicator: {
//     width: 8,
//     height: 8,
//     borderRadius: 4,
//     marginRight: 8,
//     shadowColor: '#3B82F6',
//     shadowOffset: { width: 0, height: 0 },
//     shadowOpacity: 0.8,
//     shadowRadius: 4,
//     elevation: 4,
//   },
//   tooltipTitle: {
//     fontSize: 14,
//     fontWeight: '600',
//     color: '#FFFFFF',
//     textShadowColor: 'rgba(59, 130, 246, 0.5)',
//     textShadowOffset: { width: 0, height: 0 },
//     textShadowRadius: 4,
//   },
//   tooltipText: {
//     fontSize: 12,
//     color: '#E5E7EB',
//     lineHeight: 16,
//     fontFamily: 'monospace',
//   },
//   tooltipFooter: {
//     marginTop: 12,
//     alignItems: 'center',
//   },
//   tooltipDots: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   dot: {
//     width: 4,
//     height: 4,
//     borderRadius: 2,
//     backgroundColor: 'rgba(255, 255, 255, 0.3)',
//     marginHorizontal: 2,
//   },
//   dotActive: {
//     backgroundColor: '#3B82F6',
//     shadowColor: '#3B82F6',
//     shadowOffset: { width: 0, height: 0 },
//     shadowOpacity: 0.8,
//     shadowRadius: 3,
//     elevation: 3,
//   },
//   tooltipArrow: {
//     position: 'absolute',
//     bottom: -6,
//     left: '50%',
//     marginLeft: -6,
//     width: 12,
//     height: 12,
//     backgroundColor: 'rgba(17, 24, 39, 0.95)',
//     borderRightWidth: 1,
//     borderBottomWidth: 1,
//     borderColor: 'rgba(59, 130, 246, 0.3)',
//     transform: [{ rotate: '45deg' }],
//   },
// });

import { useState, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  Animated,
  Platform,
} from 'react-native';
import { BarChart, LineChart, PieChart } from 'react-native-gifted-charts';
import TopBar from '../components/TopBar';
import { primary } from '../utils/global';

const screenWidth = Dimensions.get('window').width;

interface TooltipData {
  visible: boolean;
  x: number;
  y: number;
  title: string;
  content: string;
  type: 'bar' | 'line' | 'pie';
}

// Mock data
const monthlyData = [
  { value: 1200, label: 'Jan', frontColor: primary },
  { value: 1800, label: 'Feb', frontColor: primary },
  { value: 1500, label: 'Mar', frontColor: primary },
  { value: 2200, label: 'Apr', frontColor: primary },
  { value: 1900, label: 'May', frontColor: primary },
  { value: 2400, label: 'Jun', frontColor: primary },
  { value: 2100, label: 'Jul', frontColor: primary },
  { value: 2800, label: 'Aug', frontColor: primary },
  { value: 2300, label: 'Sep', frontColor: primary },
  { value: 2600, label: 'Oct', frontColor: primary },
  { value: 2900, label: 'Nov', frontColor: primary },
  { value: 3200, label: 'Dec', frontColor: primary },
];

const dailyData = [
  { value: 120, label: '1' },
  { value: 180, label: '2' },
  { value: 150, label: '3' },
  { value: 220, label: '4' },
  { value: 190, label: '5' },
  { value: 240, label: '6' },
  { value: 210, label: '7' },
  { value: 160, label: '8' },
  { value: 280, label: '9' },
  { value: 200, label: '10' },
  { value: 250, label: '11' },
  { value: 180, label: '12' },
  { value: 320, label: '13' },
  { value: 190, label: '14' },
  { value: 240, label: '15' },
];

const categoryData = [
  { value: 35, color: primary, text: '35%', label: 'Food' },
  { value: 20, color: '#10B981', text: '20%', label: 'Transport' },
  { value: 15, color: '#F59E0B', text: '15%', label: 'Entertainment' },
  { value: 20, color: '#EF4444', text: '20%', label: 'Shopping' },
  { value: 10, color: '#8B5CF6', text: '10%', label: 'Bills' },
];

export default function InsightsScreen() {
  const [tooltip, setTooltip] = useState<TooltipData>({
    visible: false,
    x: 0,
    y: 0,
    title: '',
    content: '',
    type: 'bar',
  });
  const tooltipOpacity = useRef(new Animated.Value(0)).current;

  const showTooltip = (
    x: number,
    y: number,
    title: string,
    content: string,
    type: 'bar' | 'line' | 'pie',
  ) => {
    setTooltip({ visible: true, x, y, title, content, type });
    Animated.timing(tooltipOpacity, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const hideTooltip = () => {
    Animated.timing(tooltipOpacity, {
      toValue: 0,
      duration: 150,
      useNativeDriver: true,
    }).start(() => {
      setTooltip(prev => ({ ...prev, visible: false }));
    });
  };

  const handleBarPress = (item: any, index: number) => {
    const content = `Total: $${item.value}\n\n• Food: $${Math.round(
      item.value * 0.35,
    )}\n• Transport: $${Math.round(
      item.value * 0.2,
    )}\n• Shopping: $${Math.round(
      item.value * 0.2,
    )}\n• Entertainment: $${Math.round(
      item.value * 0.15,
    )}\n• Bills: $${Math.round(item.value * 0.1)}`;
    showTooltip(50 + index * 30, 200, `${item.label} Expenses`, content, 'bar');
  };

  const handleLinePress = (item: any, index: number) => {
    const content = `Amount: $${item.value}\n\n• Lunch: $${Math.round(
      item.value * 0.4,
    )}\n• Transport: $${Math.round(item.value * 0.3)}\n• Coffee: $${Math.round(
      item.value * 0.2,
    )}\n• Other: $${Math.round(item.value * 0.1)}`;
    showTooltip(50 + index * 18, 200, `Day ${item.label}`, content, 'line');
  };

  const renderTooltip = data => (
    <View className="bg-gray-900/95 rounded-xl py-2 px-4 border border-[#00807b]/40">
      <Text className="text-sm font-semibold text-white">{data.label}</Text>
      <Text className="text-xs text-gray-200 leading-4 font-mono">
        {data.value}
      </Text>
    </View>
  );

  return (
    <>
      <TopBar name="Insights" back={false} />
      <ScrollView className="flex-1 p-4" showsVerticalScrollIndicator={false}>
        {/* Quick Stats */}
        <View>
          <View className="flex-row justify-between gap-3 mb-3">
            <View className="flex-1 bg-white p-4 rounded-xl shadow">
              <Text className="text-xl font-bold text-gray-900 mb-1">
                ₹2,840
              </Text>
              <Text className="text-xs text-gray-500 mb-1">This Month</Text>
              <Text className="text-xs text-green-500 font-medium">
                +12% from last month
              </Text>
            </View>
            <View className="flex-1 bg-white p-4 rounded-xl shadow">
              <Text className="text-xl font-bold text-gray-900 mb-1">
                ₹94.67
              </Text>
              <Text className="text-xs text-gray-500 mb-1">Daily Average</Text>
              <Text className="text-xs text-red-500 font-medium">
                -5% from last month
              </Text>
            </View>
          </View>
          <View className="flex-row justify-between gap-3 mb-3">
            <View className="flex-1 bg-white p-4 rounded-xl shadow">
              <Text className="text-xl font-bold text-gray-900 mb-1">Food</Text>
              <Text className="text-xs text-gray-500 mb-1">Top Category</Text>
              <Text className="text-xs text-green-500 font-medium">
                35% of spending
              </Text>
            </View>
            <View className="flex-1 bg-white p-4 rounded-xl shadow">
              <Text className="text-xl font-bold text-gray-900 mb-1">23</Text>
              <Text className="text-xs text-gray-500 mb-1">Transactions</Text>
              <Text className="text-xs text-green-500 font-medium">
                +3 from last month
              </Text>
            </View>
          </View>
        </View>

        {/* Monthly Overview */}
        <View className="bg-white mb-6 rounded-2xl p-5 shadow">
          <Text className="text-lg font-semibold text-gray-900 mb-1">
            Monthly Overview
          </Text>
          <Text className="text-sm text-gray-500 mb-4">
            January - December {new Date().getFullYear()}
          </Text>
          <View className="items-center py-2">
            <BarChart
              data={monthlyData}
              width={screenWidth - 100}
              height={220}
              barWidth={24}
              spacing={12}
              renderTooltip={renderTooltip}
              autoCenterTooltip
              // roundedTop
              // roundedBottom
              hideRules
              xAxisThickness={1}
              yAxisThickness={1}
              xAxisColor={'#E5E7EB'}
              yAxisColor={'#E5E7EB'}
              yAxisTextStyle={{ color: '#6B7280', fontSize: 12 }}
              xAxisLabelTextStyle={{ color: '#6B7280', fontSize: 11 }}
              noOfSections={6}
              maxValue={4000}
              // onPress={handleBarPress}
              // onLongPress={handleBarPress}
              // onPressOut={hideTooltip}
              activeOpacity={0.7}
            />
          </View>
        </View>

        {/* Daily Trend */}
        <View className="bg-white mb-6 rounded-2xl p-5 shadow">
          <Text className="text-lg font-semibold text-gray-900 mb-1">
            Current Month Trend
          </Text>
          <Text className="text-sm text-gray-500 mb-4">
            Daily expenses in{' '}
            {new Date().toLocaleString('default', { month: 'long' })}
          </Text>
          <View className="items-center py-2">
            <LineChart
              data={dailyData}
              width={screenWidth - 100}
              height={220}
              spacing={24}
              color={primary}
              thickness={1}
              startFillColor={'rgba(0, 128, 123, 0.3)'}
              endFillColor={'rgba(0, 128, 123, 0.1)'}
              startOpacity={0.9}
              endOpacity={0.2}
              initialSpacing={0}
              noOfSections={6}
              maxValue={350}
              yAxisColor={'#E5E7EB'}
              xAxisColor={'#E5E7EB'}
              yAxisThickness={1}
              xAxisThickness={1}
              rulesType="solid"
              rulesColor={'#F3F4F6'}
              yAxisTextStyle={{ color: '#6B7280', fontSize: 12 }}
              xAxisLabelTextStyle={{ color: '#6B7280', fontSize: 11 }}
              dataPointsHeight={6}
              dataPointsWidth={6}
              dataPointsColor={primary}
              textShiftY={-2}
              textShiftX={-5}
              textFontSize={10}
              onPress={handleLinePress}
              hideDataPoints={false}
              curved
              areaChart
            />
          </View>
        </View>

        {/* Category Breakdown */}
        <View className="bg-white mb-6 rounded-2xl p-5 shadow">
          <Text className="text-lg font-semibold text-gray-900 mb-1">
            Category Breakdown
          </Text>
          <Text className="text-sm text-gray-500 mb-4">
            Spending distribution this month
          </Text>
          <View className="items-center py-5">
            <PieChart
              data={categoryData}
              donut
              showTooltip
              showGradient
              sectionAutoFocus
              radius={100}
              innerRadius={55}
              innerCircleColor={'#FFFFFF'}
              centerLabelComponent={() => (
                <View className="justify-center items-center">
                  <Text className="text-lg font-bold text-gray-900">
                    ₹2,840
                  </Text>
                  <Text className="text-xs text-gray-500">Total</Text>
                </View>
              )}
            />
          </View>
          <View className="mt-5">
            {categoryData.map((item, index) => (
              <View key={index} className="flex-row items-center mb-2">
                <View
                  className="w-3 h-3 rounded-full mr-3"
                  style={{ backgroundColor: item.color }}
                />
                <Text className="flex-1 text-sm text-gray-700">
                  {item.label}
                </Text>
                <Text className="text-sm font-medium text-gray-900">
                  {item.text}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <View className="h-6" />

        {/* Tooltip */}
        {tooltip.visible && (
          <Animated.View
            className="absolute w-52 z-50"
            style={{
              left: Math.min(Math.max(tooltip.x, 20), screenWidth - 220),
              top: tooltip.y,
              opacity: tooltipOpacity,
            }}
          >
            <View className="absolute -top-1 -left-1 -right-1 -bottom-1 bg-[#00807b]/10 rounded-xl shadow-lg" />
            <View className="bg-gray-900/95 rounded-xl p-4 border border-[#00807b]/40">
              <View className="flex-row items-center mb-3">
                <View
                  className="w-2 h-2 rounded-full mr-2"
                  style={{ backgroundColor: getTooltipColor(tooltip.type) }}
                />
                <Text className="text-sm font-semibold text-white">
                  {tooltip.title}
                </Text>
              </View>
              <Text className="text-xs text-gray-200 leading-4 font-mono">
                {tooltip.content}
              </Text>
              <View className="mt-3 items-center">
                <View className="flex-row">
                  <View className="w-1 h-1 rounded-full bg-[#00807b] mx-1" />
                  <View className="w-1 h-1 rounded-full bg-white/30 mx-1" />
                  <View className="w-1 h-1 rounded-full bg-white/30 mx-1" />
                </View>
              </View>
            </View>
            <View
              className="absolute w-3 h-3 bg-gray-900/95 border border-[#00807b]/40"
              style={{
                bottom: -6,
                left: '50%',
                marginLeft: -6,
                transform: [{ rotate: '45deg' }],
              }}
            />
          </Animated.View>
        )}
        <View className="h-12" />
      </ScrollView>
    </>
  );
}

const getTooltipColor = (type: 'bar' | 'line' | 'pie') => {
  switch (type) {
    case 'bar':
      return primary;
    case 'line':
      return '#10B981';
    case 'pie':
      return '#8B5CF6';
    default:
      return primary;
  }
};
