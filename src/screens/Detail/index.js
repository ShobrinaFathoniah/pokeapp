import {
  StyleSheet,
  ScrollView,
  RefreshControl,
  View,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getDetailPokemon, saveCatchMons} from './redux/action';
import {setRefreshing} from '../../store/globalAction';
import {GentiumPlus, LoadingBar} from '../../components';
import {moderateScale} from 'react-native-size-matters';
import {COLORS} from '../../utils/colors';

const Detail = ({route}) => {
  const {params} = route.params;
  const urlDetail = params.url;

  const dispatch = useDispatch();
  const {
    dataDetail = {
      types: [],
      sprites: {
        front_shiny: '',
      },
      stats: [
        {base_stat: ''},
        {base_stat: ''},
        {base_stat: ''},
        {base_stat: ''},
        {base_stat: ''},
        {base_stat: ''},
      ],
      name: '',
      species: {
        name: '',
      },
    },
  } = useSelector(state => state.detail);
  const {isLoading, refreshing} = useSelector(state => state.global);
  const {_user} = useSelector(state => state.user);
  const getDetail = useCallback(
    value => {
      dispatch(getDetailPokemon(value));
    },
    [dispatch],
  );

  const onRefresh = () => {
    dispatch(setRefreshing(true));
    getDetail(urlDetail);
    dispatch(setRefreshing(false));
  };

  const renderItemTypes = ({item}) => {
    return (
      <View style={styles.typeContainer}>
        <GentiumPlus style={styles.typeText}>{item.type.name}</GentiumPlus>
      </View>
    );
  };

  const renderItemAbilities = ({item}) => {
    return (
      <View style={styles.typeContainer}>
        <GentiumPlus style={styles.typeText}>{item.ability.name}</GentiumPlus>
      </View>
    );
  };

  const renderItemMoves = ({item}) => {
    return (
      <View style={styles.typeContainer}>
        <GentiumPlus style={styles.typeText}>{item.move.name}</GentiumPlus>
      </View>
    );
  };

  const catchPokemon = () => {
    dispatch(saveCatchMons(_user._id, _user.catchMons, dataDetail));
  };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
      }
      style={styles.page}>
      {isLoading && !dataDetail ? (
        <LoadingBar loading={isLoading} />
      ) : (
        <View>
          <View style={styles.toRow}>
            <Image
              source={{
                uri: dataDetail.sprites.front_shiny
                  ? dataDetail.sprites.front_shiny
                  : '',
              }}
              style={styles.image}
            />
            <View style={styles.infoContainer}>
              <GentiumPlus style={styles.textName}>
                {dataDetail.name ? dataDetail.name : ''}
              </GentiumPlus>
              <GentiumPlus style={styles.textBabInfo}>Types</GentiumPlus>
              <FlatList
                data={dataDetail.types}
                horizontal={true}
                keyExtractor={(_item, index) => index}
                renderItem={renderItemTypes}
              />
              <GentiumPlus style={styles.textBabInfo}>Ability</GentiumPlus>
              <FlatList
                data={dataDetail.abilities}
                horizontal={true}
                keyExtractor={(_item, index) => index}
                renderItem={renderItemAbilities}
              />
              <GentiumPlus style={styles.textBabInfo}>Species</GentiumPlus>
              <GentiumPlus style={styles.textValueBab}>
                {dataDetail.species.name}
              </GentiumPlus>
            </View>
          </View>

          <View style={styles.statusContainer}>
            <View style={[styles.toRow, styles.pageTypes]}>
              <View style={styles.statusPage}>
                <GentiumPlus style={styles.textBab}>HP</GentiumPlus>
                <GentiumPlus style={styles.textValueBab}>
                  {dataDetail.stats[0].base_stat
                    ? dataDetail.stats[0].base_stat
                    : 0}
                </GentiumPlus>
              </View>
              <View style={styles.statusPage}>
                <GentiumPlus style={styles.textBab}>Attack</GentiumPlus>
                <GentiumPlus style={styles.textValueBab}>
                  {dataDetail.stats[1].base_stat
                    ? dataDetail.stats[1].base_stat
                    : 0}
                </GentiumPlus>
              </View>
              <View style={styles.statusPage}>
                <GentiumPlus style={styles.textBab}>Defense</GentiumPlus>
                <GentiumPlus style={styles.textValueBab}>
                  {dataDetail.stats[2].base_stat
                    ? dataDetail.stats[2].base_stat
                    : 0}
                </GentiumPlus>
              </View>
            </View>
            <View style={[styles.toRow, styles.pageTypes]}>
              <View style={styles.statusPage}>
                <GentiumPlus style={styles.textBab}>Special Attack</GentiumPlus>
                <GentiumPlus style={styles.textValueBab}>
                  {dataDetail.stats[3].base_stat
                    ? dataDetail.stats[3].base_stat
                    : 0}
                </GentiumPlus>
              </View>
              <View style={styles.statusPage}>
                <GentiumPlus style={styles.textBab}>
                  Special Defense
                </GentiumPlus>
                <GentiumPlus style={styles.textValueBab}>
                  {dataDetail.stats[4].base_stat
                    ? dataDetail.stats[4].base_stat
                    : 0}
                </GentiumPlus>
              </View>
              <View style={styles.statusPage}>
                <GentiumPlus style={styles.textBab}>Speed</GentiumPlus>
                <GentiumPlus style={styles.textValueBab}>
                  {dataDetail.stats[5].base_stat
                    ? dataDetail.stats[5].base_stat
                    : 0}
                </GentiumPlus>
              </View>
            </View>
          </View>

          <View>
            <GentiumPlus style={styles.textBab}>Moves</GentiumPlus>
            <FlatList
              data={dataDetail.moves}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(_item, index) => index}
              renderItem={renderItemMoves}
            />
          </View>

          {/* {_user.catchMons} */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={catchPokemon}>
              <GentiumPlus style={styles.textButton}>Catch Me~!</GentiumPlus>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </ScrollView>
  );
};

export default Detail;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: moderateScale(10),
  },
  image: {
    width: moderateScale(200),
    height: moderateScale(150),
    alignSelf: 'center',
  },
  textName: {
    fontSize: moderateScale(20),
    color: COLORS.darkBlue,
  },
  statusPage: {
    margin: moderateScale(10),
    alignItems: 'center',
  },
  textBab: {
    fontSize: moderateScale(18),
    color: COLORS.darkBlue,
  },
  textValueBab: {
    fontSize: moderateScale(16),
    color: COLORS.darkBlue,
  },
  toRow: {
    flexDirection: 'row',
    margin: moderateScale(5),
  },
  statusContainer: {
    margin: moderateScale(5),
  },
  typeContainer: {
    borderRadius: moderateScale(5),
  },
  typeText: {
    fontSize: moderateScale(15),
    color: COLORS.darkBlue,
    marginRight: moderateScale(5),
  },
  infoContainer: {
    alignSelf: 'center',
  },
  button: {
    margin: moderateScale(10),
    padding: moderateScale(12),
    backgroundColor: COLORS.darkBlue,
    alignSelf: 'center',
    borderRadius: moderateScale(5),
  },
  textButton: {
    fontSize: moderateScale(15),
    color: COLORS.white,
  },
  buttonContainer: {
    alignSelf: 'center',
  },
  pageTypes: {
    justifyContent: 'space-around',
  },
  textBabInfo: {
    fontSize: moderateScale(15),
    color: COLORS.darkYellow,
    marginRight: moderateScale(5),
  },
});
