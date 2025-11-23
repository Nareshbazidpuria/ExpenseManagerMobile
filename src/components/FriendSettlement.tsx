import { ActivityIndicator, Text, View } from 'react-native';
import { expenseTypes, primary } from '../utils/global';
import Avatar from './Avatar';
import { useEffect, useState } from 'react';
import { totalSettlementAPI } from '../api/apis';
import { useIsFocused } from '@react-navigation/native';
import Bicon from './Bicon';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import SettlementCard from './SettlementCard';

const FriendSettlement = ({
  refresh,
  friend,
  settleDown,
  settleLoading,
}: {
  refresh: any;
  friend: any;
  settleDown: any;
  settleLoading: boolean;
}) => {
  const isFocused = useIsFocused(),
    [data, setData] = useState<any>({}),
    [loading, setLoading] = useState<boolean>(true),
    authUser = useSelector((state: RootState) => state.authUser);

  const fetchData = async () => {
    let Data = {};
    setLoading(true);
    try {
      const res = await totalSettlementAPI({
        expenseType: expenseTypes.friend,
        to: friend?._id,
      });
      if (res.status === 200) Data = res.data?.data;
    } catch (error) {
      console.log(error);
    } finally {
      setData(Data);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isFocused) fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused, refresh]);

  return (
    <View className={`py-2 px-2 border`} style={{ borderColor: primary }}>
      {loading ? (
        <ActivityIndicator color={primary} />
      ) : data?.from ? (
        // <>
        //   <View className={`flex justify-between gap-1`}>
        //     <View
        //       className={`flex flex-row items-center justify-between gap-2 w-full bg-white py-2 px-3 rounded-lg`}
        //     >
        //       <Avatar
        //         value={data.from === authUser._id ? friend.name : authUser.name}
        //         w={35}
        //       />
        //       <Text>
        //         <Text>will pay </Text>
        //         <Text className={`font-semibold`}>₹{data.amount}</Text>
        //         <Text> to</Text>
        //       </Text>
        //       <Avatar
        //         value={data.from === authUser._id ? authUser.name : friend.name}
        //         w={35}
        //       />
        //     </View>
        //     <View className="h-2 border-b" style={{ borderColor: primary }} />
        //     <View className="gap-1 my-2">
        //       <View className={`p-3 rounded-lg bg-white gap-1`}>
        //         <Text className="text-xs">
        //           Total Paid By You & {friend.name}
        //         </Text>
        //         <View className="mt-2 flex flex-row items-center justify-between">
        //           <View className="flex flex-row items-center">
        //             <Avatar value={authUser.name} w={30} />
        //             <Text className="ml-2">{authUser.name}</Text>
        //           </View>

        //           <Text
        //             className="font-semibold text-lg"
        //             style={{ color: primary }}
        //           >
        //             ₹{data.yourSpent}
        //           </Text>
        //         </View>
        //         <View className="mt-2 flex flex-row items-center justify-between">
        //           <View className="flex flex-row items-center">
        //             <Avatar value={friend.name} w={30} />
        //             <Text className="ml-2">{friend.name}</Text>
        //           </View>

        //           <Text
        //             className="font-semibold text-lg"
        //             style={{ color: primary }}
        //           >
        //             ₹{data.friendSpent}
        //           </Text>
        //         </View>
        //       </View>
        //       <View
        //         className={`p-3 rounded-lg bg-white flex flex-row items-center justify-between`}
        //       >
        //         <View>
        //           <Text className="text-xs">
        //             Total Paid (From{' '}
        //             {moment(data?.fromDate).format('hh:mm A DD/MM/YY')})
        //           </Text>
        //           <Text
        //             className={`font-semibold text-2xl`}
        //             style={{ color: primary }}
        //           >
        //             ₹{data?.total}
        //           </Text>
        //         </View>
        //         <Bicon
        //           title="Settle Now"
        //           disabled={settleLoading}
        //           onPress={() =>
        //             settleDown({ type: expenseTypes.friend, to: friend._id })
        //           }
        //           loading={settleLoading}
        //         />
        //       </View>
        //     </View>
        //   </View>
        // </>

        <SettlementCard
          data={data}
          obj={friend}
          settleDown={settleDown}
          settleLoading={settleLoading}
          showBtn
          type={expenseTypes.friend}
        />
      ) : (
        <Text>No Records</Text>
      )}
    </View>
  );
};

export default FriendSettlement;
