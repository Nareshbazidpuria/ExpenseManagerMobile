import { ActivityIndicator, Text, View } from 'react-native';
import { primary } from '../utils/global';
import Avatar from './Avatar';
import { useEffect, useState } from 'react';
import { totalTeamAPI } from '../api/apis';
import { useIsFocused } from '@react-navigation/native';

const TotalTeam = ({ date, refresh, group }) => {
  const isFocused = useIsFocused(),
    [data, setData] = useState({}),
    [loading, setLoading] = useState();

  const fetchData = async params => {
    let Data = {};
    setLoading(true);
    try {
      const res = await totalTeamAPI({ ...params, to: group?._id });
      if (res.status === 200) Data = res.data?.data;
    } catch (error) {
    } finally {
      setData(Data);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isFocused) fetchData({ date });
  }, [isFocused, date, refresh]);

  return (
    <View className={`py-3 px-2 border`} style={{ borderColor: primary }}>
      {loading ? (
        <ActivityIndicator color={primary} />
      ) : data?.total ? (
        <>
          <View className={`flex flex-row justify-between flex-wrap`}>
            {data?.members?.map(({ name, amount }, i) => (
              <View
                key={`${name}-${amount}-${i}`}
                className={`flex flex-row items-center gap-2 w-1/2 mb-2`}
              >
                <Avatar value={name} />
                <Text className={`font-semibold text-base`}>₹{amount}</Text>
              </View>
            ))}
          </View>
          <View className={`flex flex-row items-center justify-between`}>
            <Text className={`font-semibold text-xs`}>
              Total: ₹{data?.total}
            </Text>
            {group?.members?.length > 2 && (
              <Text className={`font-semibold text-xs`}>
                Per Person: ₹{(data.third || 0)?.toFixed(2)}
              </Text>
            )}
            <View className={`flex flex-row gap-1 items-center`}>
              <Text className={`font-semibold text-xs`}>Remaining:</Text>
              <Text
                className={`font-semibold text-xs text-[${
                  data?.remaining >= 0 ? '#00c70a' : '#ff0000'
                }]`}
              >
                ₹{(data?.remaining || 0)?.toFixed(2)}
              </Text>
            </View>
          </View>
        </>
      ) : (
        <Text>No Records</Text>
      )}
    </View>
  );
};

export default TotalTeam;
