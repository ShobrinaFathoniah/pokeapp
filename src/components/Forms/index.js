import {StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {moderateScale} from 'react-native-size-matters';
import {LoginPic, RegisPic} from '../../assets';
import {GentiumPlus, SourceSerifPro} from '../FontComponents';
import {COLORS} from '../../utils/colors';
import LoadingBar from '../LoadingBar';

const Forms = ({
  type,
  children,
  onPressButton,
  onPressText,
  noImage = false,
  loading = false,
}) => {
  const image = () => {
    if (type === 'Login' && noImage === false) {
      return <Image style={styles.image} source={RegisPic} />;
    } else if (type === 'Register' && noImage === false) {
      return <Image style={styles.image} source={LoginPic} />;
    } else {
      return null;
    }
  };

  const helpText = types => {
    if (types === 'Login') {
      return (
        <View style={styles.containerTextHelper}>
          <GentiumPlus style={{color: COLORS.black}}>
            Not Have an Account?
          </GentiumPlus>
          <TouchableOpacity onPress={onPressText}>
            <GentiumPlus style={styles.text}>Register</GentiumPlus>
          </TouchableOpacity>
        </View>
      );
    } else if (types === 'Register') {
      return (
        <View style={styles.containerTextHelper}>
          <GentiumPlus style={{color: COLORS.black}}>
            Have an Account?
          </GentiumPlus>
          <TouchableOpacity onPress={onPressText}>
            <GentiumPlus style={styles.text}>Login</GentiumPlus>
          </TouchableOpacity>
        </View>
      );
    }
  };

  return (
    <View>
      <SourceSerifPro style={styles.title}>{type}</SourceSerifPro>
      {image()}
      {children}
      {loading ? (
        <LoadingBar loading={loading} />
      ) : (
        <TouchableOpacity style={styles.button} onPress={onPressButton}>
          <GentiumPlus style={styles.buttonText}>{type}</GentiumPlus>
        </TouchableOpacity>
      )}

      {helpText(type)}
    </View>
  );
};

export default Forms;

const styles = StyleSheet.create({
  button: {
    padding: moderateScale(10),
    borderRadius: moderateScale(3),
    alignSelf: 'center',
    backgroundColor: COLORS.darkBlue,
    margin: moderateScale(10),
    width: moderateScale(260),
  },
  buttonText: {
    alignSelf: 'center',
    color: COLORS.white,
    fontSize: moderateScale(14),
  },
  image: {
    width: moderateScale(250),
    height: moderateScale(300),
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  text: {
    fontSize: moderateScale(13),
    color: COLORS.darkBlue,
    marginStart: moderateScale(10),
  },
  containerTextHelper: {
    flexDirection: 'row',
    margin: moderateScale(10),
    alignSelf: 'center',
  },
  title: {
    color: COLORS.darkBlue,
    alignSelf: 'center',
    fontSize: moderateScale(32),
    letterSpacing: moderateScale(0.5),
    marginTop: moderateScale(15),
  },
});
