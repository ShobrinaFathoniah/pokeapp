import {Alert, Animated, Image, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {moderateScale} from 'react-native-size-matters';
import {PokeBall} from '../../assets';

const PokemonAnimation = ({image, animation, pokemon = true}) => {
  const leftValue = useState(new Animated.Value(0))[0];
  const bottoomValue = useState(new Animated.Value(0))[0];
  const opacity = useState(new Animated.Value(0))[0];

  useEffect(() => {
    if (animation === 'catch') {
      const moving = () => {
        Animated.timing(opacity, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: true,
        }).start();
      };
      moving();

      const bag = () => {
        Animated.timing(bottoomValue, {
          toValue: 500,
          duration: 8000,
          useNativeDriver: false,
        }).start();
      };
      bag();
      Alert.alert('Pemberitahuan', 'You did it~!');
    } else if (animation === 'notCatch') {
      const moving = () => {
        Animated.timing(leftValue, {
          toValue: 1000,
          duration: 3000,
          useNativeDriver: false,
        }).start();
      };
      moving();
      Alert.alert('Pemberitahuan', 'Sorry :(');
    }
  }, [leftValue, animation, bottoomValue, opacity]);

  if (pokemon && animation === 'catch') {
    const styles = StyleSheet.create({
      image: {
        width: moderateScale(150),
        height: moderateScale(150),
      },
      page: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      animation: {
        opacity,
      },
    });

    return (
      <View style={styles.page}>
        <Animated.View style={styles.animation}>
          <Image source={{uri: image}} style={styles.image} />
        </Animated.View>
      </View>
    );
  } else if (pokemon && animation === 'notCatch') {
    const styles = StyleSheet.create({
      image: {
        width: moderateScale(150),
        height: moderateScale(150),
      },
      page: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      animation: {
        marginBottom: leftValue,
      },
    });

    return (
      <View style={styles.page}>
        <Animated.View style={styles.animation}>
          <Image source={{uri: image}} style={styles.image} />
        </Animated.View>
      </View>
    );
  } else {
    const styles = StyleSheet.create({
      image: {
        width: moderateScale(100),
        height: moderateScale(100),
      },
      page: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      animation: {
        marginBottom: bottoomValue,
      },
    });

    return (
      <View style={styles.page}>
        <Animated.View style={styles.animation}>
          <Image source={PokeBall} style={styles.image} />
        </Animated.View>
      </View>
    );
  }
};

export default PokemonAnimation;
