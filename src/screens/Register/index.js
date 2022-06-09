import {
  StyleSheet,
  ScrollView,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {Formik} from 'formik';
import {registerSchema} from '../../utils/globalSchema';
import {ErrorText, Forms, Input} from '../../components';
import {navigate} from '../../utils/navigate';
import {myDb} from '../../utils/db';
import {useDispatch, useSelector} from 'react-redux';
import storage from '@react-native-firebase/storage';
import {launchImageLibrary} from 'react-native-image-picker';
import {setDataUser} from '../../store/userAction';
import {moderateScale} from 'react-native-size-matters';
import {sendDataRegister} from './redux/action';

const Register = () => {
  const dispatch = useDispatch();
  const {
    _user = {
      photoURL:
        'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
    },
  } = useSelector(state => state.user);

  const register = values =>
    dispatch(
      sendDataRegister(
        values.name,
        values.email,
        values.password,
        values.bio,
        _user.photoURL,
      ),
    );
  const goToLogin = () => navigate('Login');

  const changePhotoProfile = async () => {
    const options = {
      mediaType: 'photo',
    };

    const result = await launchImageLibrary(options);

    const reference = storage().ref(
      `photoProfile/${_user._id}/${result.assets[0].fileName}`,
    );

    const pathToFile = result.assets[0].uri;
    await reference.putFile(pathToFile);

    const url = await storage()
      .ref(`photoProfile/${_user._id}/${result.assets[0].fileName}`)
      .getDownloadURL();

    if (url) {
      changingPhoto(url);
    }
    console.log(url);
  };

  const changingPhoto = async url => {
    let isUpdate = false;
    await myDb.ref(`users/${_user._id}`).update({
      photoURL: url,
    });
    isUpdate = true;

    if (isUpdate) {
      const results = await myDb.ref(`users/${_user._id}`).once('value');
      console.log(results);
      if (results.val()) {
        dispatch(setDataUser(results.val()));
      }
    }
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
            type="Register">
            <View>
              <TouchableOpacity onPress={changePhotoProfile}>
                <Image
                  source={{
                    uri: _user.photoURL,
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
