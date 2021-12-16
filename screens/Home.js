import React, { useEffect, useState} from 'react';
import { Text, View, StyleSheet, Dimensions, FlatList } from 'react-native';

import { getPopularMovies, getUpcomingMovies } from '../services/services';
import { SliderBox } from 'react-native-image-slider-box'
import react from 'react';
import List from '../components/List';

const dimentions = Dimensions.get('screen');
const Home = () => {
    console.log(dimentions);
    const [movieImages, setMovieImages] = useState('');
    const [popularMovies, setpopularMovies] = useState('');
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
    })
  }, []);
    return (
    <react.Fragment> 
    <View styles={styles.sliderContainer}>
        <SliderBox 
            images = {movieImages} 
            dotStyle = {styles.sliderStyle}
            sliderBoxHeight = {dimentions.height / 1} 
            autoplay = {true} 
            circleLoop = {true}
        />
    </View>
    <View styles={styles.carousel}>
        <FlatList 
            data={popularMovies}
            horizontal={true} 
            renderItem={({item}) => <Text>{item.title}</Text>} />
    </View>
    <View>
        <List title="List component title"></List>
    </View>
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