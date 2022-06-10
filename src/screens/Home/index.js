import {StyleSheet, View} from 'react-native';
import React, {useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getAllPokemon} from './redux/action';
import {
  ListPokemon,
  LoadingBar,
  SourceSerifPro,
  SquareButton,
} from '../../components';
import {setRefreshing} from '../../store/globalAction';
import {moderateScale} from 'react-native-size-matters';
import {COLORS} from '../../utils/colors';
import {getDetailPokemon} from '../Detail/redux/action';

const Home = () => {
  const dispatch = useDispatch();
  const {dataAllPokemon} = useSelector(state => state.home);
  const {isLoading, refreshing} = useSelector(state => state.global);
  const getDataPokemon = useCallback(
    value => {
      dispatch(getAllPokemon(value));
    },
    [dispatch],
  );

  useEffect(() => {
    getDataPokemon();
  }, [getDataPokemon]);

  const onRefresh = () => {
    dispatch(setRefreshing(true));
    dispatch(getAllPokemon());
  };

  const onPressLeftButton = useCallback(() => {
    getDataPokemon(dataAllPokemon.previous);
  }, [dataAllPokemon.previous, getDataPokemon]);

  const onPressRightButton = useCallback(() => {
    getDataPokemon(dataAllPokemon.next);
  }, [dataAllPokemon.next, getDataPokemon]);

  const buttonPage = () => {
    return (
      <View style={styles.buttonPage}>
        <SquareButton name="left" onPress={onPressLeftButton} />
        <SquareButton name="right" onPress={onPressRightButton} />
      </View>
    );
  };

  const titleView = () => {
    return (
      <SourceSerifPro style={styles.textTitle}>List Pokemon</SourceSerifPro>
    );
  };

  const getDetail = useCallback(
    value => {
      dispatch(getDetailPokemon(value));
    },
    [dispatch],
  );

  return (
    <View style={styles.page}>
      {isLoading ? (
        <LoadingBar loading={isLoading} />
      ) : (
        <View>
          <ListPokemon
            onRefresh={onRefresh}
            refreshing={refreshing}
            data={dataAllPokemon.results}
            ListFooterComponent={buttonPage}
            ListHeaderComponent={titleView}
            getDetail={getDetail}
          />
        </View>
      )}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  buttonPage: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: moderateScale(10),
  },
  textTitle: {
    fontSize: moderateScale(18),
    color: COLORS.darkBlue,
    margin: moderateScale(10),
  },
});
