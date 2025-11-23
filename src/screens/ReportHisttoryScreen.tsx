import {
  ActivityIndicator,
  Dimensions,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import TopBar from '../components/TopBar';
import { primary, screens, secondary } from '../utils/global';
import { settlementHistoryListAPI } from '../api/settlements';
import { message } from '../utils/common';
import IonIcon from 'react-native-vector-icons/Ionicons';
import SettlementCard from '../components/SettlementCard';
import moment from 'moment';

const ReportHistoryScreen: React.FC = ({}: any) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<any>([]);
  const [refresh, setRefresh] = useState(new Date());
  const [refreshing, setRefreshing] = useState(false);

  const settlementList = async () => {
    try {
      setLoading(true);
      const res = await settlementHistoryListAPI();
      if (res?.status === 200) setData(res?.data?.data);
    } catch (error: any) {
      console.log(error);
      error?.data?.message && message(error.data.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh && settlementList();
  }, [refresh]);

  return (
    <View>
      <TopBar name={screens.ReportHistory} />
      <ScrollView
        className={`h-[${Dimensions.get('window').height / 4.55}] p-2`}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              setRefreshing(true);
              setRefresh(new Date());
              setRefreshing(false);
            }}
          />
        }
      >
        {loading ? (
          <View className={`flex items-center justify-center h-full`}>
            <ActivityIndicator size="large" color={primary} />
          </View>
        ) : data?.length ? (
          data.map((settlement: any) => (
            <View
              key={settlement._id}
              className="p-2 mb-2 rounded-lg"
              style={{ backgroundColor: secondary }}
            >
              {/* <Text>{new Date(settlement.createdAt).toLocaleTimeString()}</Text> */}
              <View className="p-1 mb-1 flex gap-2 flex-row items-center justify-between">
                <Text className="font-semibold w-1/2">
                  {(settlement.group || settlement.friend).name}
                  {/* {moment(settlement.createdAt).format('DD MMM, YYYY hh:mm A')} */}
                </Text>
                <Text className="text-sm w-1/2 text-right pr-2">
                  By:{' '}
                  <Text className="font-semibold">
                    {settlement?.user?.name}
                  </Text>
                </Text>
                {/* <Text className="text-sm">
                  {(settlement.group || settlement.friend).name}
                  {moment(settlement.createdAt).format('DD MMM, YYYY hh:mm A')}
                </Text> */}
                {/* <Avatar value={settlement?.user?.name} w={40} /> */}
              </View>
              <SettlementCard
                key={settlement._id}
                data={settlement.data}
                showBtn={false}
                type={settlement.expenseType}
                obj={settlement.group || settlement.friend}
              />
              <View className="flex flex-row items-center justify-end px-1">
                <IonIcon name="time-outline" size={16} />
                <Text className="text-sm text-right ml-1">
                  {moment(settlement.createdAt).format('DD MMM, YYYY hh:mm A')}
                </Text>
              </View>
            </View>
          ))
        ) : (
          <View
            className={`flex items-center justify-center bg-[#f2f2f2] py-56`}
          >
            <IonIcon name="folder-open-outline" size={70} color={'gray'} />
            <Text className="mt-4 text-lg text-gray-400">
              No Settlement History
            </Text>
          </View>
        )}
        <View className="h-24" />
      </ScrollView>
    </View>
  );
};
export default ReportHistoryScreen;
