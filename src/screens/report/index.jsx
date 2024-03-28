import { View } from "react-native";
import TopBar from "../../components/Topbar";
import tw from "twrnc";
import { useState } from "react";
import Collapse from "./Collapse";
import TotalTeam from "./TotalTeam";
import TotalOwn from "./TotalOwn";

const Report = () => {
  const [date, setDate] = useState();
  const [collapsed, setCollapsed] = useState({ 1: false, 2: false });

  return (
    <View>
      <TopBar date={date} setDate={setDate} />
      <View style={tw`mx-1`}>
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
      </View>
    </View>
  );
};
export default Report;
