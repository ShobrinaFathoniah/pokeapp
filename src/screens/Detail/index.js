import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const Detail = ({route}) => {
  const {params} = route.params;
  const urlDetail = params.url;

  return (
    <View style={styles.page}>
      <Text>{urlDetail}</Text>
    </View>
  );
};

export default Detail;

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
});
