import {StyleSheet, View} from 'react-native';
import React from 'react';
import {GentiumPlus} from '../FontComponents';
import {COLORS} from '../../utils/colors';
import {moderateScale} from 'react-native-size-matters';

const ErrorText = ({textError}) => {
  if (textError) {
    return (
      <View style={styles.page}>
        <GentiumPlus style={styles.text}>{textError}</GentiumPlus>
      </View>
    );
  } else {
    return <View />;
  }
};

export default ErrorText;

const styles = StyleSheet.create({
  page: {
    backgroundColor: COLORS.darkRed,
    alignSelf: 'center',
    width: moderateScale(270),
    borderRadius: moderateScale(5),
    padding: moderateScale(5),
    paddingStart: moderateScale(10),
  },
  text: {
    color: COLORS.white,
    fontSize: moderateScale(16),
  },
});
