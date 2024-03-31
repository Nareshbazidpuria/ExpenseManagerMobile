import { Text, View } from "react-native";
import tw from "twrnc";
import { primary } from "../../utils/common";
import { useEffect, useState } from "react";
import { totalOwnAPI } from "../../api/apis";
import { useIsFocused } from "@react-navigation/native";

const TotalOwn = ({ date, refresh }) => {
  const isFocused = useIsFocused();
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);

  const fetchData = async (params) => {
    let Data = [],
      totl = 0;
    try {
      const res = await totalOwnAPI(params);
      if (res.status === 200) Data = res.data?.data;
    } catch (error) {
    } finally {
      Data.forEach(({ amount }) => (totl += amount));
      setTotal(totl);
      setData(Data);
    }
  };

  useEffect(() => {
    if (isFocused) fetchData({ date });
  }, [isFocused, date, refresh]);

  return (
    <View style={tw`py-3 px-2 border border-[${primary}]`}>
      {data?.length ? (
        <>
          <View style={tw`flex flex-row flex-wrap`}>
            {data.map(({ _id, amount }) => (
              <View style={tw`flex flex-row gap-2 w-1/2 items-center`}>
                <Text style={tw`text-base w-24`}>{_id}:</Text>
                <Text style={tw`font-semibold text-lg`}>₹ {amount}</Text>
              </View>
            ))}
          </View>
          <Text style={tw`font-semibold text-xs mt-2`}>Total: ₹ {total}</Text>
        </>
      ) : (
        <Text>No Records</Text>
      )}
    </View>
  );
};

export default TotalOwn;
