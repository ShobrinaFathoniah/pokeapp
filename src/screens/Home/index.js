import {StyleSheet, View} from 'react-native';
import React, {useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getAllPokemon} from './redux/action';
import {ListPokemon, LoadingBar, SquareButton} from '../../components';
import {setRefreshing} from '../../store/globalAction';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {TouchableOpacity} from 'react-native-gesture-handler';

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
          />
          <View style={styles.buttonPage}>
            <SquareButton name="left" onPress={onPressLeftButton} />
            <SquareButton name="right" onPress={onPressRightButton} />
          </View>
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
  },
});
