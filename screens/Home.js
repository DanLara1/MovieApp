import React, { useEffect, useState} from 'react';
import { Text, View, StyleSheet, Dimensions, ScrollView } from 'react-native';

import { getPopularMovies, getUpcomingMovies, getPopularTv } from '../services/services';
import { SliderBox } from 'react-native-image-slider-box'
import react from 'react';
import List from '../components/List';

const dimentions = Dimensions.get('screen');
const Home = () => {
    console.log(dimentions);
    const [movieImages, setMovieImages] = useState('');
    const [popularMovies, setpopularMovies] = useState('');
    const [popularTv, setPopularTv] = useState('')
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
        setpopularMovies(movies)
    })
    .catch(err => {
        setError(err);
    });

    getPopularTv().then(movies => {
        setPopularTv(movies)
    })
    .catch(err => {
        setError(err);
    });
  }, []);
    return (
    <react.Fragment>
    <ScrollView> 
    <View styles={styles.sliderContainer}>
        <SliderBox 
            images = {movieImages} 
            dotStyle = {styles.sliderStyle}
            sliderBoxHeight = {dimentions.height / 1} 
            autoplay = {true} 
            circleLoop = {true}
        />
    </View>
    <View style={styles.carousel}>
        <List title="Popular Movies" content={popularMovies} />
    </View>
    <View style={styles.carousel}>
        <List title="Popular TV Shows" content={popularTv} />
    </View>
    </ScrollView>
    </react.Fragment> 
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
    },
    carousel: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default Home;