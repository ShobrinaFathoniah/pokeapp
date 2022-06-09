import Root from './src/routers';
import React, {useEffect} from 'react';
import codePush from 'react-native-code-push';
import SplashScreen from 'react-native-splash-screen';
import {Provider} from 'react-redux';
import {store} from './src/store';

const codePushOptions = {
  checkFrequency: codePush.CheckFrequency.ON_APP_START,
};

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <Provider store={store}>
      <Root />
    </Provider>
  );
};

export default codePush(codePushOptions)(App);
