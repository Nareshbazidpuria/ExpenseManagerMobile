import {
  Dimensions,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Collapse from '../components/Collapse';
import TotalTeam from '../components/TotalTeam';
import TotalOwn from '../components/TotalOwn';
import { groupListAPI } from '../api/apis';
import { useIsFocused } from '@react-navigation/native';
import DateSelector from '../components/DateSelector';

const ReportScreen: React.FC = ({ navigation }) => {
  const isFocused = useIsFocused(),
    [date, setDate] = useState(),
    [refreshing, setRefreshing] = useState(false),
    [refresh, setRefresh] = useState(),
    [list, setList] = useState([]),
    [collapsed, setCollapsed] = useState({});

  const groupList = async () => {
    let data = [];
    try {
      setRefreshing(true);
      const res = await groupListAPI({ hidden: false });
      if (res?.status === 200) data = res?.data?.data;
    } catch (error) {
      console.log('error', error);
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
      <DateSelector date={date} setDate={setDate} />
      <ScrollView
        className={`mx-1 h-[${Dimensions.get('window').height / 4.55}]`}
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
        {(list || []).map(
          (group, i) =>
            group?.members?.length > 2 && (
              <Collapse
                title={
                  <Text
                    onPress={() =>
                      navigation.navigate('Expenses', { data: group })
                    }
                  >
                    {group?.name}
                    <Text className={`text-gray-300`}>
                      &nbsp;({group?.members?.length} members)
                    </Text>
                  </Text>
                }
                col={collapsed}
                setCol={setCollapsed}
                Key={i + 2}
                key={i + 2}
                child={
                  <TotalTeam date={date} refresh={refresh} group={group} />
                }
              />
            ),
        )}
        {(list || []).map(
          (group, i) =>
            group?.members?.length === 2 && (
              <Collapse
                title={
                  group?.memberss?.[0]?.name ? (
                    <Text
                      onPress={() =>
                        navigation.navigate('Expenses', { data: group })
                      }
                    >
                      {group?.memberss?.[0]?.name}
                    </Text>
                  ) : (
                    <>
                      {group?.name}
                      <Text className={`text-gray-300`}>
                        &nbsp;({group?.members?.length} members)
                      </Text>
                    </>
                  )
                }
                col={collapsed}
                setCol={setCollapsed}
                Key={i + 2}
                key={i + 2}
                child={
                  <TotalTeam date={date} refresh={refresh} group={group} />
                }
              />
            ),
        )}
      </ScrollView>
    </View>
  );
};
export default ReportScreen;
