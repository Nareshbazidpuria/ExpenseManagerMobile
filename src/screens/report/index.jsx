import {
  Dimensions,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from "react-native";
import TopBar from "../../components/Topbar";
import tw from "twrnc";
import { useEffect, useState } from "react";
import Collapse from "./Collapse";
import TotalTeam from "./TotalTeam";
import TotalOwn from "./TotalOwn";
import { groupListAPI } from "../../api/apis";
import { useIsFocused } from "@react-navigation/native";

const Report = () => {
  const isFocused = useIsFocused();
  const [date, setDate] = useState();
  const [refreshing, setRefreshing] = useState(false);
  const [refresh, setRefresh] = useState();
  const [list, setList] = useState([]);
  const [collapsed, setCollapsed] = useState({});

  const groupList = async () => {
    let data = [];
    try {
      setRefreshing(true);
      const res = await groupListAPI();
      if (res?.status === 200) data = res?.data?.data;
    } catch (error) {
      console.log("error", error);
    } finally {
      setList(data);
      setRefreshing(false);
      setTimeout(() => {
        const col = { 1: false };
        data?.forEach?.((_, i) => (col[i + 2] = false));
        setCollapsed(col);
      }, 200);
    }
  };

  useEffect(() => {
    groupList();
  }, [date]);

  useEffect(() => {
    if (refresh || isFocused) groupList();
    else if (!isFocused) setCollapsed({});
  }, [refresh, isFocused]);

  return (
    <View>
      <TopBar date={date} setDate={setDate} />
      <ScrollView
        style={tw`mx-1 h-[${Dimensions.get("window").height / 4.55}]`}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              setRefreshing(true);
              setRefresh(new Date());
              setRefreshing(false);
            }}
          />
        }
      >
        <Collapse
          title="My Expenses"
          col={collapsed}
          setCol={setCollapsed}
          Key={1}
          child={<TotalOwn date={date} refresh={refresh} />}
        />
        {(list || []).map((group, i) => (
          <Collapse
            title={
              <>
                {group?.name}
                <Text style={tw`text-gray-300`}>
                  &nbsp;({group?.members?.length} members)
                </Text>
              </>
            }
            col={collapsed}
            setCol={setCollapsed}
            Key={i + 2}
            key={i + 2}
            child={<TotalTeam date={date} refresh={refresh} group={group} />}
          />
        ))}
      </ScrollView>
    </View>
  );
};
export default Report;
