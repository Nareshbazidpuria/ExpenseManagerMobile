import { RefreshControl, ScrollView, View } from "react-native";
import TopBar from "../../components/Topbar";
import tw from "twrnc";
import { useState } from "react";
import Collapse from "./Collapse";
import TotalTeam from "./TotalTeam";
import TotalOwn from "./TotalOwn";

const Report = () => {
  const [date, setDate] = useState();
  const [refreshing, setRefreshing] = useState(false);
  const [collapsed, setCollapsed] = useState({ 1: false, 2: false });

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
              setDate(new Date());
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
          child={<TotalTeam date={date} />}
        />
        <Collapse
          title="My Total Expenses"
          col={collapsed}
          setCol={setCollapsed}
          Key={2}
          child={<TotalOwn date={date} />}
        />
      </ScrollView>
    </View>
  );
};
export default Report;
