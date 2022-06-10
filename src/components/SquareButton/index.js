import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {moderateScale} from 'react-native-size-matters';
import {COLORS} from '../../utils/colors';

const SquareButton = ({
  onPress,
  name,
  size = 20,
  color = COLORS.lightYellow,
}) => {
  return (
    <View style={styles.button}>
      <TouchableOpacity onPress={onPress}>
        <AntDesign style={styles.icon} name={name} size={size} color={color} />
      </TouchableOpacity>
    </View>
  );
};

export default SquareButton;

const styles = StyleSheet.create({
  button: {
    width: moderateScale(30),
    height: moderateScale(30),
    backgroundColor: COLORS.darkBlue,
    borderRadius: moderateScale(10),
  },
  icon: {
    alignSelf: 'center',
    marginTop: moderateScale(5),
  },
});
