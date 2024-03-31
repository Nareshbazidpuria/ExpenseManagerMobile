import { Text, View } from "react-native";
import tw from "twrnc";
import { primary } from "../../utils/common";
import Avatar from "../../components/Avatar";
const Individual = ({ data, me }) => (
  <View style={tw`py-3 px-2 border border-[${primary}]`}>
    {data ? (
      <>
        <View style={tw`flex flex-row flex-wrap`}>
          {data.me?.map((e) => (
            <View style={tw`flex flex-row items-center gap-2 w-1/2 my-1`}>
              <Avatar value={me?.name?.[0]} />
              <Text>{e?.purpose},</Text>
              <Text style={tw`font-semibold text-lg`}>₹ {e?.amount}</Text>
            </View>
          ))}
          {data.you?.map((e) => (
            <View style={tw`flex flex-row items-center gap-2 w-1/2 my-1`}>
              <Avatar value={data?.to?.name?.[0]} />
              <Text>{e?.purpose},</Text>
              <Text style={tw`font-semibold text-lg`}>₹ {e?.amount}</Text>
            </View>
          ))}
        </View>
        <View style={tw`flex flex-row gap-1`}>
          <Text style={tw`font-semibold text-xs mt-2 `}>Total:</Text>
          <Text
            style={tw`font-semibold text-xs mt-2 text-[${
              data?.total >= 0 ? "#00c70a" : "#ff0000"
            }]`}
          >
            ₹ {data?.total}
          </Text>
        </View>
      </>
    ) : (
      <Text>No records</Text>
    )}
  </View>
);

export default Individual;
