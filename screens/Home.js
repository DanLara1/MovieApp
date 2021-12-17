import React, { useEffect, useState} from 'react';
import { Text, View, StyleSheet, Dimensions, ScrollView, ActivityIndicator } from 'react-native';

import { getPopularMovies, getUpcomingMovies, getPopularTv, getFamilyMovies, getDocumentary } from '../services/services';
import { SliderBox } from 'react-native-image-slider-box'
import react from 'react';
import List from '../components/List';
import Error from '../components/Error';

const dimentions = Dimensions.get('screen');
const Home = () => {
    console.log(dimentions);
    const [movieImages, setMovieImages] = useState();
    const [popularMovies, setpopularMovies] = useState();
    const [popularTv, setPopularTv] = useState();
    const [familyMovies, setFamilyMovies] = useState();
    const [documentary, setDocumentary] = useState();

    const [error, setError] = useState(false);
    const [loaded, setLoaded] = useState(false);
    
    const getData = () => {
        return Promise.all([
            getUpcomingMovies(),
            getPopularMovies(),
            //getPopularTv().
            getFamilyMovies(),
            getDocumentary(),
        ]);
    };

  useEffect(() => {
    getData().then(([upcomingMoviesData, popularMoviesData, popularTvData, familyMoviesData, documentaryData]) => {
        const moviesImagesArray = [];
        upcomingMoviesData.forEach(movie => {
            moviesImagesArray.push('https://image.tmdb.org/t/p/w500' + movie.poster_path);
        });
        setMovieImages(moviesImagesArray);
        setpopularMovies(popularMoviesData);
        setPopularTv(popularTvData);
        setFamilyMovies(familyMoviesData);
        setDocumentary(documentaryData);
    }).catch(() => {
        setError(true);
    }).finally(() => {
        setLoaded(true);
    });
  }, []);
    return (
    <react.Fragment>
    {loaded && !error &&(
        <ScrollView> 
        {movieImages && (<View styles={styles.sliderContainer}>
            <SliderBox 
                images = {movieImages} 
                dotStyle = {styles.sliderStyle}
                sliderBoxHeight = {dimentions.height / 1} 
                autoplay = {true} 
                circleLoop = {true}
            />
        </View>) }
        {popularMovies && (
            <View style={styles.carousel}>
                <List title="Popular Movies" content={popularMovies} />
            </View>
        )}
        {popularTv && (
            <View style={styles.carousel}>
                <List title="Popular TV Shows" content={popularTv} />
            </View>
        )}
        {familyMovies && (
            <View style={styles.carousel}>
                <List title="Family Movies" content={familyMovies} />
            </View>
        )}
        {documentary && (
            <View style={styles.carousel}>
                <List title="Documentaries" content={documentary} />
            </View>
        )}
        </ScrollView>
    )}
    {!loaded && <ActivityIndicator size="large"/>}
    {error && <Error />}
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