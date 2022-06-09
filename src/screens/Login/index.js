import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Forms} from '../../components';
import Input from '../../components/Input';

const Login = () => {
  return (
    <View style={styles.page}>
      <Forms type="Login">
        <View>
          <Input placeholder="Email" />
          <Input placeholder="Password" secureTextEntry={true} />
        </View>
      </Forms>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
});
