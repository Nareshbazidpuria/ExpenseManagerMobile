import { ActivityIndicator, Text, View } from 'react-native';
import { expenseTypes, primary } from '../utils/global';
import Avatar from './Avatar';
import { useEffect, useState } from 'react';
import { totalSettlementAPI } from '../api/apis';
import { useIsFocused } from '@react-navigation/native';
import Bicon from './Bicon';
import moment from 'moment';
import SettlementCard from './SettlementCard';

const TotalTeam = ({
  refresh,
  group,
  settleDown,
  settleLoading,
}: {
  refresh: any;
  group: any;
  settleDown: any;
  settleLoading: boolean;
}) => {
  const isFocused = useIsFocused(),
    [data, setData] = useState<any>({}),
    [loading, setLoading] = useState<boolean>(false);

  const fetchData = async () => {
    let Data = {};
    setLoading(true);
    try {
      const res = await totalSettlementAPI({
        expenseType: expenseTypes.group,
        to: group?._id,
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
      ) : data?.data?.length ? (
        <SettlementCard
          data={data}
          obj={group}
          settleDown={settleDown}
          settleLoading={settleLoading}
          showBtn
          type={expenseTypes.group}
        />
      ) : (
        // <>
        //   <View className={`flex justify-between gap-1`}>
        //     {data?.data?.map(({ from, to, amount }: any, i: number) => (
        //       <View
        //         key={`${from._id}-${to._id}-${amount}-${i}`}
        //         className={`flex flex-row items-center justify-between gap-2 w-full bg-white py-2 px-3 rounded-lg`}
        //       >
        //         <Avatar value={from.name} w={35} />
        //         <Text>
        //           <Text>will pay </Text>
        //           <Text className={`font-semibold`}>₹{amount}</Text>
        //           <Text> to</Text>
        //         </Text>
        //         <Avatar value={to.name} w={35} />
        //       </View>
        //     ))}
        //     <View className="h-2 border-b" style={{ borderColor: primary }} />
        //     <View className="gap-1 my-2">
        //       <View className={`p-3 rounded-lg bg-white gap-1`}>
        //         <Text className="text-xs">Total Paid By Members</Text>
        //         {data?.total?.members?.map((member: any, i: number) => (
        //           <View
        //             key={'member-total' + i}
        //             className="mt-2 flex flex-row items-center justify-between"
        //           >
        //             <View className="flex flex-row items-center">
        //               <Avatar value={member.name} w={30} />
        //               <Text className="ml-2">{member.name}</Text>
        //             </View>

        //             <Text
        //               className="font-semibold text-lg"
        //               style={{ color: primary }}
        //             >
        //               ₹{member.amount}
        //             </Text>
        //           </View>
        //         ))}
        //       </View>
        //       <View
        //         className={`p-3 rounded-lg bg-white flex flex-row items-center justify-between`}
        //       >
        //         <View>
        //           <Text className="text-xs">
        //             Total Paid (From{' '}
        //             {moment(data?.total?.from).format('hh:mm A DD/MM/YY')})
        //           </Text>
        //           <Text
        //             className={`font-semibold text-2xl`}
        //             style={{ color: primary }}
        //           >
        //             ₹{data?.total?.total}
        //           </Text>
        //         </View>
        //         <Bicon
        //           title="Settle Now"
        //           disabled={settleLoading}
        //           onPress={() =>
        //             settleDown({ type: expenseTypes.group, to: group._id })
        //           }
        //           loading={settleLoading}
        //         />
        //       </View>
        //     </View>
        //   </View>
        // </>
        <Text>No Records</Text>
      )}
    </View>
  );
};

export default TotalTeam;
