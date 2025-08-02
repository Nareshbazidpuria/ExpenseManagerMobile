import { Pressable, ScrollView, Text, View } from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { useEffect, useState } from 'react';
import { expenseListAPI } from '../api/apis';
import { useIsFocused } from '@react-navigation/native';
import SwipeComp from '../components/SwipeComp';
// import { AsyncStorage } from 'react-native';
import { primary, expenseTypes, screens } from '../utils/global';
import AddExpense from '../components/AddExpense';
import Bicon from '../components/Bicon';
import { Dropdown } from 'react-native-element-dropdown';
import DateRangePicker from '../components/DateRangePicker';
import TopBar from '../components/TopBar';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setAuthUser } from '../redux/auth';

const ExpensesScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const { authUser } = useSelector(state => state);
  const { data } = route.params || {};
  const [to] = useState(data?.name || expenseTypes.own);
  const isFocused = useIsFocused();
  const [visible, setVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [date, setDate] = useState();
  const [list, setList] = useState([]);
  const [swiped, setSwiped] = useState();
  const [me, setMe] = useState();
  const [deleted, setDeleted] = useState();
  const [edit, setEdit] = useState();
  const [dateRange, setDateRange] = useState({ start: null, end: null });

  const [value, setValue] = useState('week');
  const [showPicker, setShowPicker] = useState(false);

  // This is crucial for tracking the selected range!
  const [customRange, setCustomRange] = useState({
    startDate: null,
    endDate: null,
  });

  const handleChange = item => {
    if (item.value === 'custom') setShowPicker(true);
    else {
      setValue(item.value);
      setDateRange({ start: null, end: null });
    }
  };

  const [badges, setBadges] = useState({
    date: { label: 'Last Week', active: true },
    me: { label: 'My' },
    other: { label: "Other's" },
    verified: { label: 'Verified' },
    notVerified: { label: 'Not Verified' },
  });

  const expenseList = async params => {
    let resp = [];
    try {
      if (params?.to && params?.to === data?.name) params.to = data._id;
      setRefreshing(true);
      const res = await expenseListAPI(params);
      if (res?.status === 200) resp = res?.data?.data;
    } catch (error) {
      console.log('error', error);
    } finally {
      setList(resp);
      setRefreshing(false);
    }
  };

  const onBadgePress = badge => {
    if (badge === 'date') {
    } else {
      const col = { ...badges };
      col[badge] = { ...col[badge], active: !col[badge].active };
      setBadges(col);
    }
  };

  useEffect(() => {
    if (!visible) expenseList({ date, to });
  }, [visible, date, to]);

  useEffect(() => {
    if (deleted) expenseList({ date, to });
  }, [deleted]);

  const checkLoggedIn = async () => {
    if (!authUser) {
      const loggedIn = await AsyncStorage.getItem('user');
      if (!loggedIn) navigation?.navigate(screens.Login);
      else dispatch(setAuthUser(JSON.parse(loggedIn)));
    }
  };

  useEffect(() => {
    checkLoggedIn();
  }, [isFocused]);

  useEffect(() => {
    if (dateRange.start && dateRange.end && !showPicker) setValue('custom');
  }, [dateRange, showPicker]);

  return (
    <View>
      <TopBar
        name={
          data?.memberss?.[0]?.name || data?.own ? (
            data.memberss?.[0]?.name || data.own
          ) : (
            <View className="flex flex-row items-center gap-2">
              <Text className={`text-lg font-semibold text-white`}>{to}</Text>
              <Text className={`text-sm text-gray-200`}>
                {data?.members?.length} members
              </Text>
            </View>
          )
        }
      />
      {/* <View
        className={`flex flex-row justify-between items-center py-2 px-2`}
        style={{ backgroundColor: primary }}
      >
        {to !== expenseTypes.own && (
          <Pressable
            onPress={() =>
              !data?.memberss?.[0]?.name &&
              navigation.navigate('GroupDetails', { id: data?._id })
            }
          >
            <Text
              numberOfLines={1}
              className={`text-lg text-white font-semibold`}
            >
              {data?.memberss?.[0]?.name || to}
            </Text>
          </Pressable>
        )}
        {!data?.memberss?.[0]?.name && (
          <Text className={`text-xs text-white`}>
            {data?.members?.length} members
          </Text>
        )}
        <DateSelector
          date={date}
          setDate={setDate}
          cls={to === expenseTypes.own ? 'w-full' : 'w-1/2'}
        />
      </View> */}
      {showPicker && (
        <DateRangePicker
          range={dateRange}
          setRange={setDateRange}
          setShow={setShowPicker}
        />
      )}

      {list?.length ? (
        <>
          <ScrollView
            className="w-full py-2 px-1 flex flex-row"
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            {Object.entries(badges).map(([key, badge]) =>
              key === 'date' ? (
                <>
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
                      <Text className="p-3">{item.label}</Text>
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
                </>
              ) : (
                <Bicon
                  key={key}
                  title={badge.label}
                  cls="mx-1 rounded-full px-4"
                  bg={badge.active ? primary : 'white'}
                  borderColor="gray"
                  onPress={onBadgePress.bind({}, key)}
                />
              ),
            )}
          </ScrollView>
          <SwipeComp data={list} me={me} />
        </>
      ) : (
        <View
          className={`flex items-center justify-center bg-[#f2f2f2] h-[95.8%]`}
        >
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
        onPress={() => navigation.navigate(screens.AddExpense, { data, edit })}
      >
        <IonIcon color="white" name="add" size={28} />
      </Pressable>
      {/* <AddExpense
        visible={visible}
        setVisible={setVisible}
        edit={edit}
        setEdit={setEdit}
      /> */}
    </View>
  );
};

export default ExpensesScreen;
