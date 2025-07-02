import React, {useEffect} from 'react';
import {ScrollView, StatusBar, Text, View} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {active, background} from '../utils/global';
import {RootStackParamList} from '../utils/types';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../redux/store';
import {setStatusBarColor} from '../redux/common';

type NavigationProp = StackNavigationProp<RootStackParamList, 'MatchDetails'>;
type Props = {navigation: NavigationProp};

const MatchDetailsScreen: React.FC<Props> = ({}) => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(setStatusBarColor(active));
    return () => {
      dispatch(setStatusBarColor(background));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ScrollView className="flex-1" style={{backgroundColor: background}}>
      <StatusBar barStyle="dark-content" />
      <View style={{backgroundColor: active}} className="h-56 rounded-b-3xl">
        <Text>H</Text>
      </View>
    </ScrollView>
  );
};

export default MatchDetailsScreen;
