import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {GentiumPlus} from '../../components';
import {moderateScale} from 'react-native-size-matters';
import {COLORS} from '../../utils/colors';
import {getDetailPokemon} from '../Detail/redux/action';
import {baseUrl} from '@env';
import {navigate} from '../../utils/navigate';

const PokeBag = () => {
  const {_user} = useSelector(state => state.user);
  const dispatch = useDispatch();

  const renderItemMons = ({item}) => {
    const url = `${baseUrl}/pokemon/${item.order}`;
    const goToDetail = () => {
      dispatch(getDetailPokemon(url));
      navigate('Detail', {params: {url}});
    };

    return (
      <TouchableOpacity style={styles.typeContainer} onPress={goToDetail}>
        <GentiumPlus style={styles.typeText}>{item.name}</GentiumPlus>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.page}>
      <FlatList
        data={_user.catchMons}
        keyExtractor={(_item, index) => index}
        renderItem={renderItemMons}
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
  },
  typeText: {
    fontSize: moderateScale(15),
    color: COLORS.darkBlue,
    marginRight: moderateScale(5),
  },
});
