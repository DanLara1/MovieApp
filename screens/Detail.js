import React, { useEffect, useState } from 'react';
import { Image, ScrollView, Text, StyleSheet, Dimensions, ActivityIndicator, View, Modal, Pressable } from 'react-native';
import StarRating from 'react-native-star-rating';
import { isDisabled } from 'react-native/Libraries/LogBox/Data/LogBoxData';
import dateFormat from 'dateformat';


import { getMovie } from '../services/services';
import PlayButton from '../components/PlayButton';
import Video from '..components/Video';

const placeholderImage = require('../assets/images/paper.png');
const height = Dimensions.get('screen').height

const Detail = ({route, navigation }) => {

    const [movieDetail, setMovieDetail] = useState();
    const [loaded, setLoaded] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const movieId = route.params.movieDetail.id;

    useEffect(() => {
        getMovie(movieId).then(movieData => {
            setMovieDetail(movieData);
            setLoaded(true);
        });
    }, [movieId]);

    {/* to swtich the modal oposite of current state, if false > true if true > false which will either
    open the modal or close it */}
    const showVideo = () => {
        setModalVisible(!modalVisible);
    };

    return (
        <React.Fragment>
            {loaded && (
                <View>
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
                        <View style={styles.playButton}>
                            <PlayButton handlePress={showVideo} />
                        </View>
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
                    <Text style={styles.overview}>{movieDetail.overview}</Text>
                    <Text style={styles.release}>{'Release Date: ' + dateFormat(movieDetail.release_date, 'dddd, mmmm ds, yyyy')}</Text>
                </ScrollView>
                <Modal supportedOrientations={['portrait', 'landscape']} animationType="slide" visible={modalVisible}>
                    <View style={styles.videoModal}>
                        <Video onClose={showVideo} />
                    </View>
                </Modal>
                </View>
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
        fontWeight: 'bold'
    },
    overview: {
        padding: 15
    },
    release: {
        fontWeight: 'bold'
    },
    playButton: {
        position: 'absolute',
        top: -25,
        right: 20,
    },
    videoModal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default Detail;


{/* <Pressable onPress={() => showVideo()}>
                            <Text>{'Hide Modal'}</Text>
                        </Pressable> */}