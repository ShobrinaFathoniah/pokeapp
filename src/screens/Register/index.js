import {
  StyleSheet,
  ScrollView,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {Formik} from 'formik';
import {registerSchema} from '../../utils/globalSchema';
import {ErrorText, Forms, Input} from '../../components';
import {navigate} from '../../utils/navigate';
import {useDispatch, useSelector} from 'react-redux';
import storage from '@react-native-firebase/storage';
import {launchImageLibrary} from 'react-native-image-picker';
import {moderateScale} from 'react-native-size-matters';
import {sendDataRegister} from './redux/action';

const Register = () => {
  const dispatch = useDispatch();
  const {isLoading} = useSelector(state => state.global);
  const [photoUrl, setPhotoUrl] = useState(
    'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
  );

  const register = values =>
    dispatch(
      sendDataRegister(
        values.name,
        values.email,
        values.password,
        values.bio,
        photoUrl,
      ),
    );
  const goToLogin = () => navigate('Login');

  const changePhotoProfile = async () => {
    const options = {
      mediaType: 'photo',
    };

    const result = await launchImageLibrary(options);

    const reference = storage().ref(
      `photoProfile/${result.assets[0].fileName}`,
    );

    const pathToFile = result.assets[0].uri;
    await reference.putFile(pathToFile);

    const url = await storage()
      .ref(`photoProfile/${result.assets[0].fileName}`)
      .getDownloadURL();

    if (url) {
      setPhotoUrl(url);
    }
    console.log(url);
  };

  return (
    <ScrollView style={styles.page}>
      <Formik
        validationSchema={registerSchema}
        initialValues={{email: '', password: '', name: '', bio: ''}}
        onSubmit={register}>
        {({handleChange, handleSubmit, values, errors}) => (
          <Forms
            onPressText={goToLogin}
            onPressButton={handleSubmit}
            noImage={true}
            loading={isLoading}
            type="Register">
            <View>
              <TouchableOpacity onPress={changePhotoProfile}>
                <Image
                  source={{
                    uri: photoUrl,
                  }}
                  style={styles.image}
                />
              </TouchableOpacity>

              <ErrorText textError={errors.name} />
              <Input
                placeholder="Your Name"
                onChangeText={handleChange('name')}
                value={values.name}
              />

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

              <Input
                placeholder="Your Bio"
                onChangeText={handleChange('bio')}
                value={values.bio}
              />
            </View>
          </Forms>
        )}
      </Formik>
    </ScrollView>
  );
};

export default Register;

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  image: {
    width: moderateScale(150),
    height: moderateScale(150),
    marginVertical: moderateScale(30),
    marginHorizontal: moderateScale(10),
    borderRadius: moderateScale(10),
    alignSelf: 'center',
  },
});
