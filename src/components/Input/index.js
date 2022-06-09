import {StyleSheet, TextInput, View} from 'react-native';
import React from 'react';
import {moderateScale} from 'react-native-size-matters';
import {COLORS} from '../../utils/colors';

const Input = ({
  onChangeText,
  value,
  placeholder,
  secureTextEntry = false,
  style,
  placeholderTextColor = COLORS.darkBlue,
  onSubmitEditing,
}) => {
  const passedStyles = Array.isArray(style)
    ? Object.assign({}, ...style)
    : style;

  return (
    <View style={styles.containerInput}>
      <TextInput
        style={[styles.input, {...passedStyles}]}
        onChangeText={onChangeText}
        value={value}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        secureTextEntry={secureTextEntry}
        onSubmitEditing={onSubmitEditing}
      />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  input: {
    width: moderateScale(270),
    height: moderateScale(46),
    marginBottom: moderateScale(12),
    borderBottomWidth: moderateScale(1),
    padding: moderateScale(10),
    borderColor: COLORS.lightBlue,
    borderRadius: moderateScale(5),
    color: COLORS.darkBlue,
  },
  containerInput: {
    alignSelf: 'center',
  },
});
