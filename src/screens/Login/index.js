import {StyleSheet, View, ScrollView} from 'react-native';
import React from 'react';
import {Forms, ErrorText, Input} from '../../components';
import {Formik} from 'formik';
import {loginSchema} from '../../utils/globalSchema';
import {navigate} from '../../utils/navigate';
import {useDispatch} from 'react-redux';
import {sendDataLogin} from './redux/action';

const Login = () => {
  const dispatch = useDispatch();
  const login = values =>
    dispatch(sendDataLogin(values.email, values.password));
  const goToRegister = () => navigate('Register');

  return (
    <ScrollView style={styles.page}>
      <Formik
        validationSchema={loginSchema}
        initialValues={{email: '', password: ''}}
        onSubmit={login}>
        {({handleChange, handleSubmit, values, errors}) => (
          <Forms
            onPressText={goToRegister}
            onPressButton={handleSubmit}
            type="Login">
            <View>
              <ErrorText textError={errors.email} />
              <Input
                placeholder="Email"
                onChangeText={handleChange('email')}
                value={values.email}
              />

              <ErrorText textError={errors.password} />
              <Input
                placeholder="Password"
                secureTextEntry={true}
                value={values.password}
                onChangeText={handleChange('password')}
              />
            </View>
          </Forms>
        )}
      </Formik>
    </ScrollView>
  );
};

export default Login;

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
});
