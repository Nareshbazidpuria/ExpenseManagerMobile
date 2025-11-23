import { Text, View } from 'react-native';
import { expenseTypes, primary } from '../utils/global';
import Avatar from './Avatar';
import Bicon from './Bicon';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const SettlementCard = ({
  data,
  type,
  showBtn,
  settleLoading,
  settleDown,
  obj,
}: {
  data: any;
  type: string;
  showBtn: boolean;
  settleLoading?: boolean;
  settleDown?: any;
  obj?: any;
}) => {
  const authUser: any = useSelector((state: RootState) => state.authUser) || {};

  return type === expenseTypes.group ? (
    <View className={`flex justify-between gap-1`}>
      {data?.data?.map(({ from, to, amount }: any, i: number) => (
        <View
          key={`${from._id}-${to._id}-${amount}-${i}`}
          className={`flex flex-row items-center justify-between gap-2 w-full bg-white py-2 px-3 rounded-lg`}
        >
          <Avatar value={from.name} w={35} />
          <Text>
            <Text>{showBtn ? 'will pay ' : 'Paid '}</Text>
            <Text className={`font-semibold`}>₹{amount}</Text>
            <Text> to</Text>
          </Text>
          <Avatar value={to.name} w={35} />
        </View>
      ))}
      <View className="h-2 border-b" style={{ borderColor: primary }} />
      <View className="gap-1 my-2">
        <View className={`p-3 rounded-lg bg-white gap-1`}>
          <Text className="text-xs">Total Paid By Members</Text>
          {data?.total?.members?.map((member: any, i: number) => (
            <View
              key={'member-total' + i}
              className="mt-2 flex flex-row items-center justify-between"
            >
              <View className="flex flex-row items-center">
                <Avatar value={member.name} w={30} />
                <Text className="ml-2">{member.name}</Text>
              </View>

              <Text
                className="font-semibold text-lg"
                style={{ color: primary }}
              >
                ₹{member.amount}
              </Text>
            </View>
          ))}
        </View>
        <View
          className={`p-3 rounded-lg bg-white flex flex-row items-center justify-between`}
        >
          <View>
            <Text className="text-xs">
              Total Paid (From{' '}
              {moment(data?.total?.from).format('DD MMM, YYYY hh:mm A')})
            </Text>
            <Text
              className={`font-semibold text-2xl`}
              style={{ color: primary }}
            >
              ₹{data?.total?.total}
            </Text>
          </View>
          {showBtn && (
            <Bicon
              title="Settle Now"
              disabled={settleLoading}
              onPress={() =>
                settleDown({ type: expenseTypes.group, to: obj._id })
              }
              loading={settleLoading}
            />
          )}
        </View>
      </View>
    </View>
  ) : (
    <View className={`flex justify-between gap-1`}>
      <View
        className={`flex flex-row items-center justify-between gap-2 w-full bg-white py-2 px-3 rounded-lg`}
      >
        <Avatar
          value={data.from === authUser._id ? obj.name : authUser.name}
          w={35}
        />
        <Text>
          <Text>{showBtn ? 'will pay ' : 'Paid '}</Text>
          <Text className={`font-semibold`}>₹{data.amount}</Text>
          <Text> to</Text>
        </Text>
        <Avatar
          value={data.from === authUser._id ? authUser.name : obj.name}
          w={35}
        />
      </View>
      <View className="h-2 border-b" style={{ borderColor: primary }} />
      <View className="gap-1 my-2">
        <View className={`p-3 rounded-lg bg-white gap-1`}>
          <Text className="text-xs">Total Paid By You & {obj.name}</Text>
          <View className="mt-2 flex flex-row items-center justify-between">
            <View className="flex flex-row items-center">
              <Avatar value={authUser.name} w={30} />
              <Text className="ml-2">{authUser.name}</Text>
            </View>

            <Text className="font-semibold text-lg" style={{ color: primary }}>
              ₹{data.yourSpent}
            </Text>
          </View>
          <View className="mt-2 flex flex-row items-center justify-between">
            <View className="flex flex-row items-center">
              <Avatar value={obj.name} w={30} />
              <Text className="ml-2">{obj.name}</Text>
            </View>

            <Text className="font-semibold text-lg" style={{ color: primary }}>
              ₹{data.friendSpent}
            </Text>
          </View>
        </View>
        <View
          className={`p-3 rounded-lg bg-white flex flex-row items-center justify-between`}
        >
          <View>
            <Text className="text-xs">
              Total Paid (From{' '}
              {moment(data?.fromDate).format('DD MMM, YYYY hh:mm A')})
            </Text>
            <Text
              className={`font-semibold text-2xl`}
              style={{ color: primary }}
            >
              ₹{data?.total}
            </Text>
          </View>
          {showBtn && (
            <Bicon
              title="Settle Now"
              disabled={settleLoading}
              onPress={() =>
                settleDown({ type: expenseTypes.friend, to: obj._id })
              }
              loading={settleLoading}
            />
          )}
        </View>
      </View>
    </View>
  );
};

export default SettlementCard;
