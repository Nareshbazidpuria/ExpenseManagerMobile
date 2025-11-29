import { Dimensions, RefreshControl, ScrollView, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import Collapse from '../components/Collapse';
import TopBar from '../components/TopBar';
import { screens } from '../utils/global';
import TotalOwn from '../components/TotalOwn';
import DateSelector from '../components/DateSelector';

const PersonalExpensesScreen: React.FC = () => {
  const [date, setDate] = useState(),
    [refreshing, setRefreshing] = useState(false),
    [refresh, setRefresh] = useState<Date | undefined>(undefined),
    [collapsed, setCollapsed] = useState<{ [key: number]: boolean }>();

  useEffect(() => {
    setTimeout(() => setCollapsed({ 1: false }), 100);
  }, []);

  return (
    <View>
      <TopBar
        name={screens.PersonalExpenses}
        extra={<DateSelector date={date} setDate={setDate} />}
      />
      <ScrollView
        className={`h-[${Dimensions.get('window').height / 4.55}] px-2 py-1`}
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
          title="Monthly Grouped"
          col={collapsed}
          setCol={setCollapsed}
          Key={1}
          child={<TotalOwn date={date} refresh={refresh} />}
        />
        <View key={'space-settlements'} className={`h-36`} />
      </ScrollView>
    </View>
  );
};
export default PersonalExpensesScreen;
