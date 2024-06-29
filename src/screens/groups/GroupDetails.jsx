import { Text, View } from "react-native";
import IonIcon from "@expo/vector-icons/Ionicons";
import tw from "twrnc";
import { primary } from "../../utils/common";
import { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Avatar from "../../components/Avatar";
import ProfileOpt from "../profile/ProfileOpt";
import { groupDetailsAPI } from "../../api/group";
import Member from "../../components/Member";
import EditGroup from "./EditGroup";

const GroupDetails = ({ route, navigation }) => {
  const { id } = route.params || {};
  const isFocused = useIsFocused();

  const [group, setGroup] = useState({});
  const [edit, setEdit] = useState();

  const details = async () => {
    try {
      const res = await groupDetailsAPI(id);
      if (res?.status === 200) setGroup(res.data?.data);
      else setGroup({});
    } catch (error) {}
  };

  const checkLoggedIn = async () => {
    const loggedIn = await AsyncStorage.getItem("user");
    if (!loggedIn) navigation?.navigate("Login");
    else details();
  };

  useEffect(() => {
    if (!edit) checkLoggedIn();
  }, [isFocused, edit]);

  return (
    <View>
      <View
        style={tw`p-2 bg-[${primary}] flex flex-row justify-between items-center`}
      >
        <Text style={tw`text-2xl text-white font-semibold`}>Group Details</Text>
      </View>
      <View style={tw`p-5 flex flex-row items-center gap-5`}>
        <Avatar value={group.name} w={20} />
        <View>
          <View style={tw`flex flex-row gap-2 items-center`}>
            <Text style={tw`text-xl font-bold`}>{group.name}</Text>
            <IonIcon
              name="pencil"
              color={primary}
              size={20}
              onPress={() => setEdit(1)}
            />
          </View>
          <Text>{group.members?.length} members</Text>
        </View>
      </View>
      <Text style={tw`p-2 font-bold border-b border-gray-300`}>Members</Text>
      <View style={tw`p-2 border-b border-gray-300`}>
        {group.members?.map(({ name, _id }) => (
          <Member key={_id} name={name} />
        ))}
      </View>
      {/* <ProfileOpt label="Add new member" icon="add-circle" /> */}
      <ProfileOpt label="Delete Group" icon="trash" />
      {edit && <EditGroup cancel={() => setEdit(false)} group={group} />}
    </View>
  );
};

export default GroupDetails;
