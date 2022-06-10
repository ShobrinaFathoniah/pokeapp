import {Alert} from 'react-native';
import {setIsLoading} from '../../../store/globalAction';
import authProvider from '@react-native-firebase/auth';
import {setDataUser} from '../../../store/userAction';
import {navigate} from '../../../utils/navigate';
import {myDb} from '../../../utils/db';

export const sendDataLogin = (email, password) => async dispatch => {
  dispatch(setIsLoading(true));
  const auth = authProvider();

  try {
    const res = await auth.signInWithEmailAndPassword(email, password);
    console.log(res);

    const results = await myDb.ref(`users/${res.user.uid}`).once('value');
    console.log(results);
    if (results.val()) {
      dispatch(setDataUser(results.val()));
      dispatch(setIsLoading(false));

      navigate('BottomTab');
    }
  } catch (error) {
    Alert.alert('Pemberitahuan', `${error}`);

    dispatch(setIsLoading(false));
  }
};
