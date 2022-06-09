import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import codePush from 'react-native-code-push';
import SplashScreen from 'react-native-splash-screen';

const codePushOptions = {
  checkFrequency: codePush.CheckFrequency.ON_APP_START,
};

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <View>
      <Text>App</Text>
    </View>
  );
};

export default codePush(codePushOptions)(App);
