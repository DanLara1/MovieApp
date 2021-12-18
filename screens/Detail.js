import React, { useEffect, useState } from 'react';
import { Image, ScrollView, Text, StyleSheet, Dimensions, ActivityIndicator, View } from 'react-native';
import StarRating from 'react-native-star-rating';
import { isDisabled } from 'react-native/Libraries/LogBox/Data/LogBoxData';

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
                <ScrollView >
                    <Image 
                    resizeMode='cover'
                    style={styles.image} 
                    source={
                        movieDetail.poster_path ?
                        {uri: 'https://image.tmdb.org/t/p/w500' + movieDetail.poster_path}
                        : placeholderImage
                    }
                    />
                    <View style={styles.container}>
                        <Text style={styles.movieTitle}>{movieDetail.title}</Text>
                        {movieDetail.genres && (
                            <View style={styles.genresContainer}>
                                {/* map will loop through the genres that are attached to each film
                                and display them all, needs the id as key */}  
                                {movieDetail.genres.map(genre =>{
                                    return <Text style={styles.genre} key={genre.id}>{genre.name}</Text>
                                })}
                            </View>
                        )}
                        <StarRating
                            disabled={true}
                            maxStars={5}
                            starSize={30} 
                            rating={movieDetail.vote_average / 2}
                            fullStarColor={gold}
                        />
                    </View>
                </ScrollView>
            )}
            {!loaded && <ActivityIndicator size='large' />}
        </React.Fragment>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        height: height / 2.5,
    },
    movieTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 10
    },
    genresContainer: {
        flexDirection: 'row',
        alignContent: 'center',
        marginTop: 20,
        marginBottom: 20
    },
    genre: {
        marginRight: 10,
        fontWeight: 'bold',
    }
});

export default Detail;