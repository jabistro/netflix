import "./Row.css";
import React, { useEffect, useState } from 'react';
import axios from '../axios';

const base_url = 'https://image.tmdb.org/t/p/original/';

const Row = ({ title, fetchUrl, isLargeRow }) => {
    const [movies, setMovies] = useState([]);

    // A snippet of code which runs based on a specific condition/variable
    useEffect(() => {
        // if dependency arr blank, run once when the row loads, and don't run again
        async function fetchData() {
            const request = await axios.get(fetchUrl);
            // console.log(request);
            setMovies(request.data.results);
            return request;
        }
        fetchData();
    }, [fetchUrl]);

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
                        src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                        key={movie.id}
                        />
                    )
                })}
            </div>
        </div>
    )
}

export default Row
