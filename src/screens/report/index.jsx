import { View } from "react-native";
import TopBar from "../../components/Topbar";
import tw from "twrnc";
import { useState } from "react";
import Collapse from "./Collapse";
import TotalTeam from "./TotalTeam";

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
          child={<TotalTeam />}
        />
      </View>
    </View>
  );
};
export default Report;
