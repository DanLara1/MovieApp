import axios from "axios";

const apiUrl = 'https://api.themoviedb.org/3/';
const apiKey = 'api_key=ab1b7ed23a01c9bcca197c9c76f03757';

export const getPopularMovies = async () => {
    const resp = await axios.get(`${apiUrl}/movie/popular?${apiKey}`);
    return(resp.data.results);
};

export const getUpcomingMovies = async () => {
    const resp = await axios.get(`${apiUrl}/movie/upcoming?${apiKey}`);
    return(resp.data.results);
};

export const getPopularTv = async () => {
    const resp = await axios.get(`${apiUrl}/tv/popular?${apiKey}`);
    return(resp.data.results);
};