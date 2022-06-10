import {StyleSheet, View} from 'react-native';
import React from 'react';
import {moderateScale} from 'react-native-size-matters';
import CircleButton from '../CircleButton';
import {COLORS} from '../../utils/colors';
import {GentiumPlus} from '../FontComponents';

const Header = ({
  button = false,
  nameIcon,
  onPressButton,
  radiusBottom = false,
  text = 'iRead',
}) => {
  const styles = StyleSheet.create({
    page: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: COLORS.white,
      justifyContent: button ? 'space-evenly' : 'center',
      borderBottomEndRadius: radiusBottom ? 150 : 0,
      borderBottomStartRadius: radiusBottom ? 150 : 0,
    },
    textAppName: {
      fontSize: moderateScale(42),
      margin: moderateScale(10),
      color: COLORS.black,
      letterSpacing: moderateScale(2),
      textAlign: 'center',
    },
  });

  return (
    <View style={styles.page}>
      <GentiumPlus style={styles.textAppName}>{text}</GentiumPlus>
      {button ? (
        <CircleButton nameIcon={nameIcon} onPress={onPressButton} />
      ) : null}
    </View>
  );
};

export default Header;
