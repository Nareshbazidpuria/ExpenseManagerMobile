import { Dimensions, RefreshControl, ScrollView, View } from "react-native";
import TopBar from "../../components/Topbar";
import tw from "twrnc";
import { useEffect, useState } from "react";
import Collapse from "./Collapse";
import TotalTeam from "./TotalTeam";
import TotalOwn from "./TotalOwn";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { users } from "../../utils/common";
import { groupListAPI, individualAPI } from "../../api/apis";
import Individual from "./Individual";

const Report = () => {
  const [date, setDate] = useState();
  const [refreshing, setRefreshing] = useState(false);
  const [individual, setIndividual] = useState([]);
  const [me, setMe] = useState();
  const [refresh, setRefresh] = useState();
  const [list, setList] = useState([]);
  const [collapsed, setCollapsed] = useState({
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
    7: false,
    8: false,
    9: false,
  });

  const getIndividual = async () => {
    let data = [];
    try {
      const res = await individualAPI({ date });
      if (res?.status === 200) data = res.data?.data;
    } catch (error) {
    } finally {
      setIndividual(data);
    }
  };

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
    }
  };

  useEffect(() => {
    groupList();
    getIndividual();
  }, [date]);

  useEffect(() => {
    if (refresh) {
      getIndividual();
      groupList();
    }
  }, [refresh]);

  useEffect(() => {
    AsyncStorage.getItem("user").then((user) =>
      setMe(JSON.parse(user || "{}"))
    );
  }, []);

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
            title={group?.name}
            col={collapsed}
            setCol={setCollapsed}
            Key={i + 2}
            members={group?.members}
            child={<TotalTeam date={date} refresh={refresh} group={group} />}
          />
        ))}
        {users
          .filter((user) => user !== me?.name)
          .map((user, i) => (
            <Collapse
              title={user}
              to={user}
              col={collapsed}
              setCol={setCollapsed}
              Key={i + 6}
              setRefresh={setRefresh}
              child={
                <Individual
                  data={individual?.find((e) => user === e?.to?.name)}
                  me={me}
                  setRefresh={setRefresh}
                />
              }
            />
          ))}
      </ScrollView>
    </View>
  );
};
export default Report;
