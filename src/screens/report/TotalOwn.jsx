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
    <View style={tw`border border-[${primary}]`}>
      {data?.length ? (
        <>
          <View
            style={tw`flex flex-row flex-wrap gap-x-2 gap-y-1 p-1 justify-between`}
          >
            {data.map(({ _id, amount }, i) => (
              <View
                key={"total-own-" + i}
                style={tw`flex flex-row items-center bg-[${primary}] rounded-full p-1`}
              >
                <Text
                  style={tw`font-semibold text-[${primary}] bg-white rounded-full p-1`}
                >
                  ₹{amount}
                </Text>
                <Text style={tw`text-white font-semibold mx-1`}>{_id}</Text>
              </View>
            ))}
          </View>
          <View
            style={tw`flex flex-row items-center bg-white border border-[${primary}] rounded-full p-1 m-1`}
          >
            <Text
              style={tw`font-semibold bg-[${primary}] text-white rounded-full p-1`}
            >
              ₹{total}
            </Text>
            <Text style={tw`font-semibold mx-1`}>Total</Text>
          </View>
        </>
      ) : (
        <Text>No Records</Text>
      )}
    </View>
  );
};

export default TotalOwn;
