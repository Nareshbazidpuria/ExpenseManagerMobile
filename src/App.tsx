import { enableScreens } from 'react-native-screens';
enableScreens();

import React from 'react';
import AppNavigator from './navigation/AppNavigator';
import '../global.css';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import Toast from 'react-native-toast-message';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <AppNavigator />
      <Toast />
    </Provider>
  );
};

export default App;
