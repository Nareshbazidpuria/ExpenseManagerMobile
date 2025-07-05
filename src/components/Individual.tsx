import { Text, View } from 'react-native';
import { primary } from '../utils/global';
import IndividualItem from './IndividualItem';
import AddExpense from './AddExpense';
import { useState } from 'react';

const Individual = ({ data, me, setRefresh }) => {
  const [to, setTo] = useState();
  const [edit, setEdit] = useState();

  return (
    <View className={`py-3 px-2 border border-[${primary}]`}>
      {data ? (
        <>
          <View className={`flex flex-row flex-wrap`}>
            {[
              ...data.me?.map(e => ({
                ...e,
                avatar: me?.name,
                to: data?.to,
              })),
              ...data.you?.map(e => ({ ...e, avatar: data?.to?.name })),
            ]
              ?.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
              ?.map(e => (
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
          <View className={`flex flex-row gap-1`}>
            <Text className={`font-semibold text-xs mt-2 `}>Total:</Text>
            <Text
              className={`font-semibold text-xs mt-2 text-[${
                data?.total >= 0 ? '#00c70a' : '#ff0000'
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
