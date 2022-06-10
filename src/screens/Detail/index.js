import {
  StyleSheet,
  ScrollView,
  RefreshControl,
  View,
  Image,
  FlatList,
} from 'react-native';
import React, {useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getDetailPokemon} from './redux/action';
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
    },
  } = useSelector(state => state.detail);
  const {isLoading, refreshing} = useSelector(state => state.global);
  const getDetail = useCallback(
    value => {
      dispatch(getDetailPokemon(value));
    },
    [dispatch],
  );

  useEffect(() => {
    getDetail(urlDetail);
  }, [getDetail, urlDetail]);

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
              <FlatList
                data={dataDetail.types}
                horizontal={true}
                keyExtractor={(_item, index) => index}
                renderItem={renderItemTypes}
              />
            </View>
          </View>

          <View style={styles.statusContainer}>
            <View style={styles.toRow}>
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
            <View style={styles.toRow}>
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
        </View>
      )}
    </ScrollView>
  );
};

export default Detail;

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  image: {
    width: moderateScale(200),
    height: moderateScale(150),
    alignSelf: 'center',
  },
  textName: {
    fontSize: moderateScale(20),
    color: COLORS.darkBlue,
    alignSelf: 'center',
  },
  statusPage: {
    margin: moderateScale(10),
  },
  textBab: {
    fontSize: moderateScale(16),
    color: COLORS.darkBlue,
  },
  textValueBab: {
    fontSize: moderateScale(16),
    color: COLORS.darkBlue,
  },
  toRow: {
    flexDirection: 'row',
    margin: moderateScale(10),
  },
  statusContainer: {
    margin: moderateScale(10),
  },
  typeContainer: {
    backgroundColor: COLORS.darkYellow,
    margin: moderateScale(5),
    height: moderateScale(50),
    borderRadius: moderateScale(5),
  },
  typeText: {
    fontSize: moderateScale(15),
    color: COLORS.darkBlue,
    margin: moderateScale(10),
  },
  infoContainer: {
    alignSelf: 'center',
  },
});
