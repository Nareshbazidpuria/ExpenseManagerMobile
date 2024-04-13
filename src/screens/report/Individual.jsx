import { Text, View } from "react-native";
import tw from "twrnc";
import { primary } from "../../utils/common";
import Avatar from "../../components/Avatar";
import moment from "moment";
import IndividualItem from "../../components/IndividualItem";

const Individual = ({ data, me }) => (
  <View style={tw`py-3 px-2 border border-[${primary}]`}>
    {data ? (
      <>
        <View style={tw`flex flex-row flex-wrap`}>
          {/* {data.me?.map((e) => (
            <IndividualItem avatar={me?.name?.[0]} e={e} />
          ))}
          {data.you?.map((e) => (
            <IndividualItem avatar={data?.to?.name?.[0]} e={e} />
          ))} */}
          {[
            ...data.me?.map((e) => ({ ...e, avatar: me?.name?.[0] })),
            ...data.you?.map((e) => ({ ...e, avatar: data?.to?.name?.[0] })),
          ]
            ?.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
            ?.map((e) => (
              <IndividualItem avatar={e?.avatar} e={e} />
            ))}
        </View>
        <View style={tw`flex flex-row gap-1`}>
          <Text style={tw`font-semibold text-xs mt-2 `}>Total:</Text>
          <Text
            style={tw`font-semibold text-xs mt-2 text-[${
              data?.total >= 0 ? "#00c70a" : "#ff0000"
            }]`}
          >
            ₹{data?.total}
          </Text>
        </View>
      </>
    ) : (
      <Text>No records</Text>
    )}
  </View>
);

export default Individual;
