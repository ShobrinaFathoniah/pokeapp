import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {moderateScale} from 'react-native-size-matters';
import {COLORS} from '../../utils/colors';
import {getDetailPokemon} from '../Detail/redux/action';
import {baseUrl} from '@env';
import {navigate} from '../../utils/navigate';
import PokemonCard from '../../components/PokemonCard';
import {SourceSerifPro} from '../../components';

const PokeBag = () => {
  const {_user} = useSelector(state => state.user);
  const dispatch = useDispatch();

  const renderItemMons = ({item}) => {
    const url = `${baseUrl}/pokemon/${item.id}`;
    const goToDetail = () => {
      dispatch(getDetailPokemon(url));
      navigate('Detail', {params: {url}});
    };

    return (
      <TouchableOpacity style={styles.typeContainer} onPress={goToDetail}>
        <PokemonCard pokemonName={item.name} />
      </TouchableOpacity>
    );
  };

  const titleView = () => {
    return (
      <SourceSerifPro style={styles.textTitle}>List My Pokemon</SourceSerifPro>
    );
  };

  return (
    <View style={styles.page}>
      <FlatList
        data={_user.catchMons}
        keyExtractor={(_item, index) => index}
        renderItem={renderItemMons}
        horizontal={false}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={titleView}
      />
    </View>
  );
};

export default PokeBag;

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  typeContainer: {
    borderRadius: moderateScale(5),
    margin: moderateScale(5),
    alignSelf: 'center',
  },
  typeText: {
    fontSize: moderateScale(15),
    color: COLORS.darkBlue,
    marginRight: moderateScale(5),
  },
  textTitle: {
    fontSize: moderateScale(18),
    color: COLORS.darkBlue,
    margin: moderateScale(10),
  },
});
