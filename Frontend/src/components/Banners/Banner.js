import React from 'react';
import { View, Text, StyleSheet, ImageBackground, Image, Pressable } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';

import { useNavigation } from '@react-navigation/native';

const colors = {
  white: 'white',
  grey: '#b3b3b3',
};

const Banner = ({imageBackground, title, bannerImage, type, screenName}) => {

  const navigation = useNavigation()

  return (
    <ImageBackground style={styles.bannerContainer} source={imageBackground}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
        <Pressable style={styles.showMore} onPress={() => navigation.navigate(screenName) }>
          <Text style={styles.showMoreText}>Show more</Text>
          <Entypo name="chevron-right" size={24} color={colors.grey} />
        </Pressable>
      </View>
      <View style={[styles.imageContainer, styles[`imageContainer_${type}`]]}>
        <Image source={bannerImage} style={[styles.image, styles[`image_${type}`]]} />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  bannerContainer: {
    padding: 10,
    height: 150,
    marginBottom: 30,
    marginTop: 20,
    flexDirection: 'row',
    borderRadius: 5,
  },
  titleContainer: {
    flex: 2,
    justifyContent: 'center',
    gap: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.white,
    marginRight: 20
  },
  showMore: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  showMoreText: {
    color: colors.grey,
    fontSize: 14,
  },
  imageContainer: {
    flex: 1,
    position: 'relative',
  },
  image: {
    position: 'absolute',
  },
  image_EXERCISE: {
    width: '120%',
    height: '140%',
    bottom: -10,
    left: -20,
  },
  imageContainer_DIET: {
    height: 120
  },
  imageContainer_PROGRESS: {
    height: 120
  },
  image_DIET: {
    width: '170%',
    height: '150%',
    position: 'absolute',
    bottom: -20,
    left: -50,
  },
  image_PROGRESS: {
    width: '210%',
    height: '150%',
    position: 'absolute',
    left: -100,
    top: -40
  }
});

export default Banner;
