import React, { useEffect, useState} from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';

import { getPopularMovies, getUpcomingMovies } from '../services/services';
import { SliderBox } from 'react-native-image-slider-box'

const dimentions = Dimensions.get('screen');
const Home = () => {
    console.log(dimentions);
    const [movieImages, setMovieImages] = useState('');
    const [error, setError] = useState(false);

  useEffect(() => {
    getUpcomingMovies().then(movies => {
        const moviesImagesArray = [];
        movies.forEach(movie => {
            moviesImagesArray.push('https://image.tmdb.org/t/p/w500'+ movie.poster_path);
        });
        setMovieImages(moviesImagesArray);
    }) .catch(err => {
        setError(err);
    });

    getPopularMovies().then(movies => {
    })
    .catch(err => {
        setError(err);
    })
  }, []);
    return (
    <View styles={styles.sliderContainer}>
        <SliderBox 
            images = {movieImages} 
            dotStyle = {styles.sliderStyle}
            sliderBoxHeight = {dimentions.height / 1} 
            autoplay = {true} 
            circleLoop = {true}
        />
    </View>
    );
}

const styles = StyleSheet.create({
    sliderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    sliderStyle: {
        height: 0
    }
});

export default Home;