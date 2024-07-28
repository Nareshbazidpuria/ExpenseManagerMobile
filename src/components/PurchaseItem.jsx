import moment from "moment";
import { ActivityIndicator, Image, Pressable, Text, View } from "react-native";
import tw from "twrnc";
import Avatar from "./Avatar";
import IonIcon from "@expo/vector-icons/Ionicons";
import verified from "../assets/verified.png";
import pending from "../assets/pending.png";
import { primary } from "../utils/common";
import { useState } from "react";

const PurchageItem = ({ data, me, loading, verifyExpense }) => {
  const [details, setDetails] = useState();

  return (
    <View style={tw`py-3 px-2 shadow bg-white m-1 mb-0 rounded`}>
      <View style={tw`flex flex-row items-center justify-between`}>
        <View style={tw`flex flex-row items-center gap-2`}>
          <Avatar value={data?.user?.name} />
          <View>
            <View style={tw`flex flex-row items-center gap-1`}>
              <Text style={tw`font-semibold`}>{data?.purpose}</Text>
              {data?.edited && (
                <>
                  <IonIcon color="gray" name="pencil" style={tw`ml-2`} />
                  <Text style={tw`font-light text-xs`}>Edited</Text>
                </>
              )}
            </View>
            <Text style={tw`text-xs`}>
              {moment(data?.createdAt)?.format("hh:mm A DD/MM/YY")}
            </Text>
          </View>
        </View>
        <View style={tw`flex flex-row gap-2 items-center`}>
          <Text style={tw`text-xl font-semibold`}>₹{data?.amount}</Text>
          {loading ? (
            <ActivityIndicator size={20} color={primary} />
          ) : data.verified ? (
            <Image source={verified} style={tw`h-5 w-5`} />
          ) : me._id === data.user._id ||
            data.verifiedBy?.includes?.(me?._id) ? (
            <Pressable
              onPressIn={setDetails.bind({}, true)}
              onPressOut={setDetails.bind({}, false)}
            >
              <Image source={pending} style={tw`h-5 w-5`} />
            </Pressable>
          ) : (
            <Text
              style={tw`font-bold text-[${primary}]`}
              onPress={verifyExpense}
            >
              Verify
            </Text>
          )}
        </View>
      </View>
      {details && (
        <View style={tw`py-3 pb-0`}>
          <View style={tw`flex flex-row gap-1`}>
            <Image source={verified} style={tw`h-4 w-4`} />
            <Text style={tw`font-bold`}>Verified By:</Text>
          </View>
          <View style={tw`py-1 px-5`}>
            {data?.members?.map?.(
              (member) =>
                data?.verifiedBy?.includes(member?._id) && (
                  <Text>{member?.name}</Text>
                )
            )}
          </View>
          <View style={tw`flex flex-row gap-1`}>
            <Image source={pending} style={tw`h-4 w-4`} />
            <Text style={tw`font-bold`}>Pending from:</Text>
          </View>
          <View style={tw`pt-1 px-5`}>
            {data?.members?.map?.(
              (member) =>
                !data?.verifiedBy?.includes(member?._id) && (
                  <Text>{member?.name}</Text>
                )
            )}
          </View>
        </View>
      )}
    </View>
  );
};

export default PurchageItem;
