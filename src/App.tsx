import { enableScreens } from 'react-native-screens';
enableScreens();

import React from 'react';
import AppNavigator from './navigation/AppNavigator';
import '../global.css';
import { Provider } from 'react-redux';
import { store } from './redux/store';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
};

export default App;
