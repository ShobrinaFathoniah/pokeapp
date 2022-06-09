// import axios from 'axios';
import {Alert} from 'react-native';
// import {setIsLoading} from '../../../store/globalAction';
import authProvider from '@react-native-firebase/auth';
import {myDb} from '../../../utils/db';
import {setDataUser} from '../../../store/userAction';
import {navigate} from '../../../utils/navigate';

export const sendDataRegister =
  (name, email, password, bio, linkPic) => async dispatch => {
    // dispatch(setIsLoading(true));
    const auth = authProvider();

    try {
      // setIsLoading(true);
      const res = await auth.createUserWithEmailAndPassword(email, password);
      console.log(res);
      if ('email' in res.user && res.user.email) {
        await auth.currentUser.updateProfile({
          displayName: name,
        });

        const payload = {
          displayName: name,
          email: res.user.email,
          photoURL: linkPic
            ? linkPic
            : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
          _id: res.user.uid,
          bio: bio ? bio : 'Available',
        };
        await myDb.ref(`users/${res.user.uid}`).set(payload);
        dispatch(setDataUser(payload));
        navigate('BottomTab');
        // dispatch(setIsLoading(false));
      }
    } catch (error) {
      Alert.alert('Pemberitahuan', `${error}`);

      // dispatch(setIsLoading(false));
    }
  };
