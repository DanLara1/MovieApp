import React, { useEffect, useState } from 'react';
import { Image, ScrollView, Text, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';

import { getMovie } from '../services/services';

const placeholderImage = require('../assets/images/paper.png');
const height = Dimensions.get('screen').height

const Detail = ({route, navigation }) => {

    const [movieDetail, setMovieDetail] = useState();
    const [loaded, setLoaded] = useState(false);
    const movieId = route.params.movieDetail.id;

    useEffect(() => {
        getMovie(movieId).then(movieData => {
            setMovieDetail(movieData);
            setLoaded(true);
        });
    }, [movieId]);

    return (
        <React.Fragment>
            {loaded && (
                <ScrollView>
                    <Image 
                    resizeMode='cover'
                    style={styles.image} 
                    source={
                        movieDetail.poster_path ?
                        {uri: 'https://image.tmdb.org/t/p/w500' + movieDetail.poster_path}
                        : placeholderImage
                    }
                    />
                </ScrollView>
            )}
            {!loaded && <ActivityIndicator size='large' />}
        </React.Fragment>
    );
};

const styles = StyleSheet.create({
    image: {
        height: height / 2.5,
        
    }
});

export default Detail;