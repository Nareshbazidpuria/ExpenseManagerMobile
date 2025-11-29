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
import { settleDownAPI, settlementListAPI } from '../api/apis';
import { useIsFocused } from '@react-navigation/native';
import TopBar from '../components/TopBar';
import { expenseTypes, primary, screens } from '../utils/global';
import IonIcon from 'react-native-vector-icons/Ionicons';
import FriendSettlement from '../components/FriendSettlement';
import { message } from '../utils/common';
import Popup from '../components/Popup';
import Bicon from '../components/Bicon';

const ReportScreen: React.FC = ({ navigation }: any) => {
  const isFocused = useIsFocused(),
    // [date, setDate] = useState(),
    [refreshing, setRefreshing] = useState(false),
    [refresh, setRefresh] = useState<Date | undefined>(undefined),
    [list, setList] = useState([]),
    [collapsed, setCollapsed] = useState({}),
    [settleLoading, setSettleLoading] = useState<boolean>(false),
    [popup, setPopup] = useState<any>();

  const settlementList = async () => {
    let data: any = [];
    try {
      setRefreshing(true);
      const res = await settlementListAPI({ hidden: false, settlement: true });
      if (res?.status === 200) data = res?.data?.data || [];
    } catch (error) {
      console.log('error', error);
    } finally {
      setList(data);
      setRefreshing(false);
      setTimeout(() => {
        const col: { [key: number]: boolean } = { 1: false };
        data.forEach((_: any, i: number) => (col[i + 2] = false));
        setCollapsed(col);
      }, 200);
    }
  };

  const settleDown = async (data: { to: string; type: string }) => {
    if (!popup) return setPopup(data);
    setSettleLoading(true);
    try {
      const res = await settleDownAPI(data);
      if (res.status === 200) {
        message(res.data?.message);
        settlementList();
      }
    } catch (error: any) {
      console.log(error);
      error?.data?.message && message(error.data.message, 'error');
    } finally {
      setSettleLoading(false);
      setPopup(false);
    }
  };

  useEffect(() => {
    if (refresh || isFocused) settlementList();
    else if (!isFocused) setCollapsed({});
  }, [refresh, isFocused]);

  return (
    <View>
      {/* <DateSelector date={date} setDate={setDate} /> */}
      <TopBar
        back={false}
        name={screens.Reports}
        extra={
          <View className="flex flex-row gap-2">
            <IonIcon
              name="person-outline"
              color={'white'}
              size={20}
              onPress={() => navigation.navigate(screens.PersonalExpenses)}
            />
            <IonIcon
              name="time-outline"
              color={'white'}
              size={20}
              onPress={() => navigation.navigate(screens.ReportHistory)}
            />
          </View>
        }
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
        {/* <Collapse
          title="My Expenses"
          col={collapsed}
          setCol={setCollapsed}
          Key={1}
          child={<TotalOwn date={date} refresh={refresh} />}
        /> */}
        {(list || []).map((group: any, i) =>
          group?.type === expenseTypes.group ? (
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
                <TotalTeam
                  refresh={refresh}
                  group={group}
                  settleDown={settleDown}
                  settleLoading={settleLoading}
                  key={i}
                />
              }
              // child={<TotalTeam date={date} refresh={refresh} group={group} />}
            />
          ) : (
            <Collapse
              title={
                <Text
                  onPress={() =>
                    navigation.navigate('Expenses', { data: group })
                  }
                >
                  {group?.name}
                </Text>
              }
              col={collapsed}
              setCol={setCollapsed}
              Key={i + 2}
              key={i + 2}
              child={
                <FriendSettlement
                  refresh={refresh}
                  friend={group}
                  settleDown={settleDown}
                  settleLoading={settleLoading}
                  key={i}
                />
              }
              // child={<TotalTeam date={date} refresh={refresh} group={group} />}
            />
          ),
        )}
        {!list.length && !refreshing && (
          <View
            className={`flex items-center justify-center bg-[#f2f2f2] py-56`}
          >
            <IonIcon name="folder-open-outline" size={70} color={'gray'} />
            <Text className="mt-4 text-lg text-gray-400 text-center">
              No settlements to show. Tap the button top right to see the
              previous settlements
            </Text>
          </View>
        )}
        <View key={'space-settlements'} className={`h-36`} />
      </ScrollView>
      <Popup
        visible={!!popup}
        content={
          <View className={`flex items-center justify-center p-5 w-80`}>
            <Text>Confirm Settlement</Text>
            <Text className="text-gray-400 mt-2 text-center">
              Are you sure you want to settle up this amount?
            </Text>
            <View className="flex flex-row justify-between mt-4 w-full">
              <Bicon
                title="No"
                onPress={() => setPopup(false)}
                cls="w-[48%]"
                bg="white"
                borderColor={primary}
                txtStyle={{ color: primary }}
              />
              <Bicon
                title="Yes"
                onPress={() => settleDown(popup)}
                cls="w-[48%]"
                disabled={settleLoading}
                loading={settleLoading}
              />
            </View>
          </View>
        }
      />
    </View>
  );
};
export default ReportScreen;
