import {View, Text} from 'react-native';
import React from 'react';
import codePush from 'react-native-code-push';

const codePushOptions = {
  checkFrequency: codePush.CheckFrequency.ON_APP_START,
};

const App = () => {
  return (
    <View>
      <Text>App</Text>
    </View>
  );
};

export default codePush(codePushOptions)(App);
