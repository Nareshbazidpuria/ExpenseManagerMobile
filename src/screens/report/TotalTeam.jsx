import { Text, View } from "react-native";
import tw from "twrnc";
import { primary } from "../../utils/common";
import Avatar from "../../components/Avatar";
import { useEffect, useState } from "react";
import { totalTeamAPI } from "../../api/apis";
import { useIsFocused } from "@react-navigation/native";

const TotalTeam = ({ date, refresh }) => {
  const isFocused = useIsFocused();
  const [data, setData] = useState({});

  const fetchData = async (params) => {
    let Data = {};
    try {
      const res = await totalTeamAPI(params);
      if (res.status === 200) Data = res.data?.data;
    } catch (error) {
    } finally {
      setData(Data);
    }
  };

  useEffect(() => {
    if (isFocused) fetchData({ date });
  }, [isFocused, date, refresh]);

  return (
    <View style={tw`py-3 px-2 border border-[${primary}]`}>
      {data?.total ? (
        <>
          <View style={tw`flex flex-row justify-between`}>
            {data?.members?.map(({ name, amount }) => (
              <View style={tw`flex flex-row items-center gap-2`}>
                <Avatar value={name?.[0]} />
                <Text style={tw`font-semibold text-lg`}>₹ {amount}</Text>
              </View>
            ))}
          </View>
          <View style={tw`flex flex-row items-center justify-between`}>
            <Text style={tw`font-semibold text-xs mt-2`}>
              Total: ₹ {data?.total}
            </Text>
            <Text style={tw`font-semibold text-xs mt-2`}>
              3rd: ₹ {(data.third || 0)?.toFixed(2)}
            </Text>
            <View style={tw`mt-2 flex flex-row gap-1 items-center`}>
              <Text style={tw`font-semibold text-xs`}>Remaining:</Text>
              <Text
                style={tw`font-semibold text-xs text-[${
                  data?.remaining >= 0 ? "#00c70a" : "#ff0000"
                }]`}
              >
                ₹ {(data?.remaining || 0)?.toFixed(2)}
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
