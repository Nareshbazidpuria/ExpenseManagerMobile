import { RefreshControl, ScrollView, View } from "react-native";
import TopBar from "../../components/Topbar";
import tw from "twrnc";
import { useEffect, useState } from "react";
import Collapse from "./Collapse";
import TotalTeam from "./TotalTeam";
import TotalOwn from "./TotalOwn";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { users } from "../../utils/common";
import { individualAPI } from "../../api/apis";
import Individual from "./Individual";

const Report = () => {
  const [date, setDate] = useState();
  const [refreshing, setRefreshing] = useState(false);
  const [individual, setIndividual] = useState([]);
  const [me, setMe] = useState();
  const [refresh, setRefresh] = useState();
  const [collapsed, setCollapsed] = useState({
    1: false,
    2: false,
    3: false,
    4: false,
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

  useEffect(() => {
    getIndividual();
  }, [date]);

  useEffect(() => {
    if (refresh) getIndividual();
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
        style={tw`mx-1`}
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
          title="Total Team Expenses"
          col={collapsed}
          setCol={setCollapsed}
          Key={1}
          child={<TotalTeam date={date} refresh={refresh} />}
        />
        <Collapse
          title="My Total Expenses"
          col={collapsed}
          setCol={setCollapsed}
          Key={2}
          child={<TotalOwn date={date} refresh={refresh} />}
        />
        {users
          .filter((user) => user !== me?.name)
          .map((user, i) => (
            <Collapse
              title={user}
              to={user}
              col={collapsed}
              setCol={setCollapsed}
              Key={i + 3}
              setRefresh={setRefresh}
              child={
                <Individual
                  data={individual?.find((e) => user === e?.to?.name)}
                  me={me}
                />
              }
            />
          ))}
      </ScrollView>
    </View>
  );
};
export default Report;
