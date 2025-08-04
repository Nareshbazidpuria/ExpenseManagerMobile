import { Pressable, Text, View } from 'react-native';
import Avatar from './Avatar';
import { expenseTypes, primary } from '../utils/global';
import IonIcon from 'react-native-vector-icons/Ionicons';

const Group: React.FC<{
  data: any;
  navigation: any;
  selected: any;
  setSelected: any;
}> = ({ data = {}, navigation, selected, setSelected }) => {
  const { name, type } = data;

  return (
    <Pressable
      className={`flex flex-row gap-2 items-center py-2 px-3 ${
        selected.includes(data._id) ? 'bg-green-100' : 'bg-white'
      } border-b border-gray-200`}
      onPress={() =>
        selected.length
          ? selected.includes(data._id)
            ? setSelected([...selected].filter(id => id !== data._id))
            : setSelected([...selected, data._id])
          : navigation.navigate('Expenses', { data })
      }
      onLongPress={setSelected.bind({}, [...selected, data._id])}
    >
      <Avatar value={data?.own?.replace(' (You)', '') || name} w={40} />
      <View className={`flex flex-row justify-between w-[82%] items-center`}>
        <View className={`w-[70%]`}>
          <Text className={`font-semibold text-lg`}>{name || data?.name}</Text>
          {type === expenseTypes.group && (
            <Text className={`font-semibold text-gray-400`}>
              Admin: {data?.admin}
            </Text>
          )}
        </View>

        {selected.includes(data._id) ? (
          <IonIcon
            name="checkmark-circle"
            size={28}
            style={{ color: primary }}
          />
        ) : data.unverifiedCount ? (
          <Text
            className={`text-white font-bold p-1 rounded-full min-w-7 h-7 text-center`}
            style={{ backgroundColor: primary }}
          >
            {data.unverifiedCount}
          </Text>
        ) : (
          type === expenseTypes.group && (
            <Text className={`font-semibold text-gray-400`}>
              {data?.members?.length} members
            </Text>
          )
        )}
      </View>
    </Pressable>
  );
};

export default Group;
// import { Pressable, Text, View } from 'react-native';
// import Avatar from './Avatar';
// import { primary } from '../utils/global';
// import IonIcon from 'react-native-vector-icons/Ionicons';

// const Group: React.FC<{
//   data: any;
//   navigation: any;
//   selected: any;
//   setSelected: any;
// }> = ({ data, navigation, selected, setSelected }) => {
//   const name =
//     data?.own || (data?.memberss?.length ? data.memberss[0].name : '');
//   return (
//     <Pressable
//       className={`flex flex-row gap-2 items-center py-2 px-3 ${
//         selected.includes(data._id) ? 'bg-green-100' : 'bg-white'
//       } border-b border-gray-200`}
//       onPress={() =>
//         selected.length
//           ? selected.includes(data._id)
//             ? setSelected([...selected].filter(id => id !== data._id))
//             : setSelected([...selected, data._id])
//           : navigation.navigate('Expenses', { data })
//       }
//       onLongPress={setSelected.bind({}, [...selected, data._id])}
//     >
//       <Avatar
//         value={data?.own?.replace(' (You)', '') || name || data?.admin || ''}
//         w={40}
//       />
//       <View className={`flex flex-row justify-between w-[82%] items-center`}>
//         <View className={`w-[70%]`}>
//           <Text className={`font-semibold text-lg`}>{name || data?.name}</Text>
//           {!name && (
//             <Text className={`font-semibold text-gray-400`}>
//               Admin: {data?.admin}
//             </Text>
//           )}
//         </View>

//         {selected.includes(data._id) ? (
//           <IonIcon
//             name="checkmark-circle"
//             size={28}
//             style={{ color: primary }}
//           />
//         ) : data.unverifiedCount ? (
//           <Text
//             className={`text-white font-bold p-1 rounded-full min-w-7 h-7 text-center`}
//             style={{ backgroundColor: primary }}
//           >
//             {data.unverifiedCount}
//           </Text>
//         ) : (
//           !name && (
//             <Text className={`font-semibold text-gray-400`}>
//               {data?.members?.length} members
//             </Text>
//           )
//         )}
//       </View>
//     </Pressable>
//   );
// };

// export default Group;
