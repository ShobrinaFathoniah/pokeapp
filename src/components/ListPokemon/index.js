import {
  StyleSheet,
  FlatList,
  View,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import React from 'react';
import {navigate} from '../../utils/navigate';
import PokemonCard from '../PokemonCard';
import {moderateScale} from 'react-native-size-matters';

const ListPokemon = ({
  data,
  onRefresh,
  refreshing,
  ListFooterComponent,
  ListHeaderComponent,
  getDetail,
}) => {
  const listPokemonView = ({item}) => {
    const url = item.url;
    const onPressItem = () => {
      getDetail(url);
      navigate('Detail', {params: {url}});
    };

    return (
      <View style={styles.itemPage}>
        <TouchableOpacity onPress={onPressItem}>
          <PokemonCard pokemonName={item.name} />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.page}>
      <FlatList
        refreshControl={
          <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
        }
        keyExtractor={(_item, index) => index}
        renderItem={listPokemonView}
        data={data}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        horizontal={false}
        ListFooterComponent={ListFooterComponent}
        ListHeaderComponent={ListHeaderComponent}
      />
    </View>
  );
};

export default ListPokemon;

const styles = StyleSheet.create({
  page: {
    alignSelf: 'center',
    marginBottom: moderateScale(10),
  },
  itemPage: {
    margin: moderateScale(5),
  },
});
