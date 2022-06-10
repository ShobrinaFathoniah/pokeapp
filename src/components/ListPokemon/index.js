import {
  StyleSheet,
  FlatList,
  View,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import React from 'react';
import {GentiumPlus} from '../FontComponents';
import {navigate} from '../../utils/navigate';

const ListPokemon = ({data, onRefresh, refreshing}) => {
  const listPokemonView = ({item}) => {
    const url = item.url;
    const onPressItem = () => navigate('Detail', {params: {url}});

    return (
      <View>
        <TouchableOpacity onPress={onPressItem}>
          <GentiumPlus>{item.name}</GentiumPlus>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View>
      <FlatList
        refreshControl={
          <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
        }
        keyExtractor={(_item, index) => index}
        renderItem={listPokemonView}
        data={data}
      />
    </View>
  );
};

export default ListPokemon;

const styles = StyleSheet.create({});
