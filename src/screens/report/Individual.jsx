import { Text, View } from "react-native";
import tw from "twrnc";
import { primary } from "../../utils/common";
import IndividualItem from "../../components/IndividualItem";
import AddExpense from "../../components/AddExpense";
import { useState } from "react";

const Individual = ({ data, me, setRefresh }) => {
  const [to, setTo] = useState();
  const [edit, setEdit] = useState();

  return (
    <View style={tw`py-3 px-2 border border-[${primary}]`}>
      {data ? (
        <>
          <View style={tw`flex flex-row flex-wrap`}>
            {[
              ...data.me?.map((e) => ({
                ...e,
                avatar: me?.name?.[0],
                to: data?.to,
              })),
              ...data.you?.map((e) => ({ ...e, avatar: data?.to?.name?.[0] })),
            ]
              ?.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
              ?.map((e) => (
                <IndividualItem
                  avatar={e?.avatar}
                  e={e}
                  onPress={() => {
                    if (e?.to) {
                      setTo(e?.to?.name);
                      setEdit({ ...e, to: e?.to?.name });
                    }
                  }}
                />
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
      <AddExpense
        visible={to}
        setVisible={setTo}
        edit={edit}
        setEdit={setEdit}
        setRefresh={setRefresh}
      />
    </View>
  );
};

export default Individual;
