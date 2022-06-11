import {StyleSheet, Image, View} from 'react-native';
import React from 'react';
import {moderateScale} from 'react-native-size-matters';
import {SourceSerifPro} from '../FontComponents';
import {PokeBallOrange} from '../../assets';
import {COLORS} from '../../utils/colors';

const PokemonCard = ({pokemonName, image = PokeBallOrange}) => {
  return (
    <View style={styles.page}>
      <Image style={styles.image} source={image} />
      <SourceSerifPro style={styles.text}>{pokemonName}</SourceSerifPro>
    </View>
  );
};

export default PokemonCard;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    width: moderateScale(150),
    height: moderateScale(70),
    backgroundColor: COLORS.lightYellow,
    alignItems: 'center',
    padding: moderateScale(10),
    borderRadius: moderateScale(10),
  },
  image: {
    height: moderateScale(30),
    width: moderateScale(25),
  },
  text: {
    fontSize: moderateScale(16),
    color: COLORS.darkBlue,
    marginTop: moderateScale(5),
  },
});
