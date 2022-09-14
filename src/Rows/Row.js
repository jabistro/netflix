import "./Row.css";
import React, { useEffect, useState } from 'react';
import axios from '../axios';
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

const base_url = 'https://image.tmdb.org/t/p/original/';

const Row = ({ title, fetchUrl, isLargeRow }) => {
    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState('');

    // A snippet of code which runs based on a specific condition/variable
    useEffect(() => {
        // if dependency arr blank, run once when the row loads, and don't run again
        async function fetchData() {
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results);
            return request;
        }
        fetchData();
    }, [fetchUrl]);

    const opts = {
        height: "390",
        width: "100%",
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 1,
        }
    }

    const handleClick = (movie) => {
        if (trailerUrl) {
            setTrailerUrl('');
        } else {
            movieTrailer(movie?.name || "")
                .then((url) => {
                    const urlParams = new URLSearchParams(new URL(url).search);
                    setTrailerUrl(urlParams.get('v'));
                }).catch(error => console.log(error));
        }
    }

    console.log(movies)

    return (
        <div className="row-wrap">
            <h2 className="row-title">{title}</h2>
            <div className="row-posters">
                {movies.map(movie => {
                    return (
                        <img
                            className={`row-poster ${isLargeRow && "row-posterLarge"}`}
                            alt={movie.name}
                            onClick={() => handleClick(movie)}
                            src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                            key={movie.id}
                        />
                    )
                })}
            </div>
            {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
        </div>
    )
}

export default Row
