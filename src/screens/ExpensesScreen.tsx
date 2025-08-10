import {
  ActivityIndicator,
  Pressable,
  RefreshControl,
  ScrollView,
  Text,
  Vibration,
  View,
} from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { useEffect, useState } from 'react';
import { expenseListAPI } from '../api/apis';
import { useIsFocused } from '@react-navigation/native';
import SwipeComp from '../components/SwipeComp';
import { primary, expenseTypes, screens, pushTypes } from '../utils/global';
import Bicon from '../components/Bicon';
import { Dropdown } from 'react-native-element-dropdown';
import DateRangePicker from '../components/DateRangePicker';
import TopBar from '../components/TopBar';
import { useDispatch, useSelector } from 'react-redux';
import { safeParse } from '../utils/common';
import { RootState } from '../redux/store';
import { setLastPush } from '../redux/push';
import moment from 'moment';

const ExpensesScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const lastPush: any = useSelector((state: RootState) => state.lastPush);
  const { data = {} } = route.params || {};
  const { name, type, members } = data;
  const isFocused = useIsFocused();
  const [refreshing, setRefreshing] = useState(false);
  const [list, setList] = useState<any>([]);
  const [dateRange, setDateRange] = useState({ start: null, end: null });
  const [loading, setLoading] = useState<boolean>(false);
  const [value, setValue] = useState('week');
  const [showPicker, setShowPicker] = useState(false);

  const defaultWeek = () => ({
    label: 'Last Week',
    active: true,
    start: moment().subtract(6, 'days').startOf('day').toISOString(),
    end: moment().endOf('day').toISOString(),
  });

  const [badges, setBadges] = useState(
    type === expenseTypes.own
      ? { date: defaultWeek() }
      : {
          date: defaultWeek(),
          me: { label: 'My' },
          other: { label: "Other's" },
          verified: { label: 'Verified' },
          notVerified: { label: 'Not Verified' },
        },
  );

  const expenseList = async (params = {}) => {
    // todo loading
    setLoading(true);
    let resp = [];
    try {
      // if (params?.to && params?.to === data?.name)
      params = {
        ...params,
        to: data._id,
        expenseType: type,
      };

      // todo manage tag on notification and verification

      // if (!params?.date) params.date = new Date().toISOString();
      const res = await expenseListAPI(params);
      if (res?.status === 200) resp = res?.data?.data || [];
    } catch (error) {
      console.log('error', error);
    } finally {
      setList(resp);
      setRefreshing(false);
      setLoading(false);
    }
  };

  const onBadgePress = badge => {
    const col = { ...badges };
    col[badge] = { ...col[badge], active: !col[badge].active };
    setBadges(col);
  };

  const handleChange = item => {
    if (item.value === 'custom') setShowPicker(true);
    else {
      switch (item.value) {
        case 'week':
          setBadges(prev => ({
            ...prev,
            date: defaultWeek(),
          }));
          break;
        case 'month':
          setBadges(prev => ({
            ...prev,
            date: {
              ...prev.date,
              start: moment().startOf('month').toISOString(),
              end: moment().endOf('month').toISOString(),
            },
          }));
          break;
        case '6months':
          setBadges(prev => ({
            ...prev,
            date: {
              ...prev.date,
              start: moment()
                .subtract(5, 'months')
                .startOf('month')
                .toISOString(),
              end: moment().endOf('month').toISOString(),
            },
          }));
          break;
        default:
          break;
      }
      setValue(item.value);
      setDateRange({ start: null, end: null });
    }
  };

  const onLastPush = () => {
    if (lastPush.type === pushTypes.expenseDetails) {
      const pushData = safeParse(lastPush.data);
      if (
        pushData &&
        pushData.expenseType === type &&
        (pushData.to === data._id || pushData.user?._id === data._id) &&
        !list.find((item: any) => item._id === pushData._id)
      ) {
        setList((prev: any) => [
          { ...pushData, swipe: false },
          ...(prev || []),
        ]);
        Vibration.vibrate();
        dispatch(setLastPush(null));
      }
    }
  };

  useEffect(() => {
    if (dateRange.start && dateRange.end && !showPicker) {
      setValue('custom');
      setBadges(prev => ({
        ...prev,
        date: {
          ...prev.date,
          start: moment(dateRange.start).startOf('day').toISOString(),
          end: moment(dateRange.end).endOf('day').toISOString(),
        },
      }));
    }
  }, [dateRange, showPicker]);

  useEffect(() => {
    if (lastPush) onLastPush();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastPush]);

  useEffect(() => {
    if (isFocused) {
      const filter: Record<string, any> = {};
      filter.tags = Object.entries(badges)
        .filter(([key, value]) => {
          if (key === 'date') {
            filter.startDate = value.start;
            filter.endDate = value.end;
          }
          return key !== 'date' && value.active;
        })
        .map(([key]) => key);

      expenseList(filter);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [badges, refreshing, isFocused]);

  return (
    <View className="flex-1">
      <TopBar
        name={
          type === expenseTypes.group ? (
            <View className="flex flex-row items-center gap-2">
              <Text className={`text-lg font-semibold text-white`}>{name}</Text>
              <Text className={`text-sm text-gray-200`}>
                {members?.length} members
              </Text>
            </View>
          ) : (
            name
          )
        }
      />
      {showPicker && (
        <DateRangePicker
          range={dateRange}
          setRange={setDateRange}
          setShow={setShowPicker}
        />
      )}
      <View>
        <ScrollView
          className="w-full py-2 px-1 flex flex-row h-14"
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {Object.entries(badges).map(([key, badge]) =>
            key === 'date' ? (
              <View key={key} className="flex flex-row h-10">
                <Dropdown
                  data={[
                    { label: 'Last Week', value: 'week' },
                    { label: 'Last Month', value: 'month' },
                    { label: 'Last 6 Months', value: '6months' },
                    {
                      label: 'Custom',
                      value: 'custom',
                    },
                  ]}
                  maxHeight={300}
                  // eslint-disable-next-line react-native/no-inline-styles
                  selectedTextStyle={{ fontSize: 14, color: 'white' }}
                  // eslint-disable-next-line react-native/no-inline-styles
                  style={{
                    backgroundColor: primary,
                    paddingHorizontal: 14,
                    borderRadius: 99,
                    marginHorizontal: 4,
                    paddingVertical: 6,
                  }}
                  // eslint-disable-next-line react-native/no-inline-styles
                  containerStyle={{
                    width: 130,
                    borderRadius: 10,
                    overflow: 'hidden',
                  }}
                  iconColor="white"
                  labelField="label"
                  valueField="value"
                  value={value}
                  renderItem={item => (
                    <Text key={item.value} className="p-3">
                      {item.label}
                    </Text>
                  )}
                  onChange={handleChange}
                />
                {value === 'custom' && dateRange?.start && dateRange?.end && (
                  <Bicon
                    key="custom"
                    title={`${dateRange?.start} - ${dateRange?.end}`}
                    cls="mx-1 rounded-full px-4"
                    onPress={setShowPicker.bind({}, true)}
                  />
                )}
              </View>
            ) : (
              <Bicon
                key={key}
                title={badge.label}
                cls="mx-1 rounded-full px-4 h-10"
                bg={badge.active ? primary : 'white'}
                borderColor={badge.active ? primary : 'gray'}
                onPress={onBadgePress.bind({}, key)}
              />
            ),
          )}
        </ScrollView>
      </View>

      {loading ? (
        <View className={`flex items-center justify-center bg-[#f2f2f2] p-56`}>
          <ActivityIndicator size="large" color={primary} />
        </View>
      ) : list?.length ? (
        <SwipeComp
          data={list}
          group={data}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => setRefreshing(true)}
            />
          }
        />
      ) : (
        <View className={`flex items-center justify-center bg-[#f2f2f2] py-56`}>
          <IonIcon name="folder-open-outline" size={70} />
          <Text className={`text-lg font-semibold`}>No Records</Text>
        </View>
      )}
      <Pressable
        className="absolute bottom-12 right-3 p-3 rounded-full shadow"
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          backgroundColor: primary,
        }}
        // onPress={() => setVisible(data || to)}
        onPress={() => navigation.navigate(screens.AddExpense, { data })}
      >
        <IonIcon color="white" name="add" size={28} />
      </Pressable>
    </View>
  );
};

export default ExpensesScreen;
