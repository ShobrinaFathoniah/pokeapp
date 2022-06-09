import {StyleSheet, Text} from 'react-native';
import React from 'react';

const GentiumPlus = ({style, children, testID, type = 'Regular'}) => {
  const passedStyles = Array.isArray(style)
    ? Object.assign({}, ...style)
    : style;

  const styles = StyleSheet.create({
    font: {
      fontFamily: `GentiumPlus-${type}`,
    },
  });

  return (
    <Text testID={testID} style={[styles.font, {...passedStyles}]}>
      {children}
    </Text>
  );
};

export default GentiumPlus;
