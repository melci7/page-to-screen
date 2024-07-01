"use client"

import * as React from "react";
import { useState, useEffect, createContext, useContext } from "react";


const DataContext = createContext()

export function DataProvider({ children }) {
    const [bookInfo, setBookInfo] = useState([]);
    const [movieInfo, setMovieInfo] = useState([]);
    const [combinedData, setCombinedData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const apiKey = "AIzaSyC_XTyRZ7oQM1aTTaacK-tsmU456yj7pNA";

    const fetchBookData = async (startIndex = 0, accumulatedBooks = []) => {
        try {
            const bookResponse = await fetch(`https://www.googleapis.com/books/v1/users/115863829884762142611/bookshelves/1001/volumes?key=${apiKey}&startIndex=${startIndex}&maxResults=40`);
            if (!bookResponse.ok) {
                throw new Error('Network response was not ok');
            }
            const bookData = await bookResponse.json();
            const bookProperties = bookData.items.map((item) => {
                const imageLinks = item.volumeInfo.imageLinks;
                if (imageLinks) {
                    const thumbnailUrl = imageLinks.thumbnail;
                    const largerImageUrl = thumbnailUrl.replace("&edge=curl", "") + "&fife=w300-h600";
                    return { ...item, bookCover: largerImageUrl };
                }
                return item;
            });
            accumulatedBooks = [...accumulatedBooks, ...bookProperties];
            if (startIndex + 40 < bookData.totalItems) {
                return fetchBookData(startIndex + 40, accumulatedBooks);
            } else {
                setBookInfo(accumulatedBooks);
            }
        } catch (error) {
            setError(error);
        }
    };

    const options = { method: 'GET', headers: { Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YzkwNThkYjJlM2IyOWZjM2ZiM2Y2NTQ5YmIxYWM1ZCIsInN1YiI6IjY2NTA2YzEwODk0ZDRlMDdjNzA2OGY0MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.FbzpZQ91smjKeszJobhV0w8STf-CybFQJpXoNKn6EX4`, accept: 'application/json' } };

    const fetchMovieData = async (pageIndex = 1, accumulatedMovies = []) => {
        try {
            const movieResponse = await fetch(`https://api.themoviedb.org/3/account/21286794/favorite/movies?page=${pageIndex}`, options);
            if (!movieResponse.ok) {
                throw new Error('Network response was not ok');
            }
            const movieData = await movieResponse.json();
            const creditsDataPromises = movieData.results.map((movie) => {
                return fetch(`https://api.themoviedb.org/3/movie/${movie.id}?append_to_response=credits`, options).then(res => res.json());
            });
            const providersPromises = movieData.results.map((movie) => {
                return fetch(`https://api.themoviedb.org/3/movie/${movie.id}/watch/providers`, options).then(res => res.json());
            });
            const [movieDetails, providers] = await Promise.all([
                Promise.all(creditsDataPromises),
                Promise.all(providersPromises)
            ]);
            const moviePoster = movieData.results.map((movie, index) => {
                const poster = movie.poster_path ? `https://image.tmdb.org/t/p/w300_and_h450_bestv2${movie.poster_path}` : null;
                const director = movieDetails[index].credits.crew.find(person => person.job === "Director");
                const directorName = director ? director.name : "Unknown Director";
                const runTime = movieDetails[index].runtime;
                const provider = providers[index].results;
                return { ...movie, moviePoster: poster, director: directorName, runTime: runTime, providers: provider };
            });
            accumulatedMovies = [...accumulatedMovies, ...moviePoster];
            if (pageIndex < movieData.total_pages) {
                return fetchMovieData(pageIndex + 1, accumulatedMovies);
            } else {
                setMovieInfo(accumulatedMovies);
            }
        } catch (error) {
            setError(error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            await Promise.all([fetchBookData(), fetchMovieData()]);
            setLoading(false);
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (bookInfo.length && movieInfo.length) {
            const combined = bookInfo.map(book => {
                const matchingMovie = movieInfo.find(movie => movie.original_title.toLowerCase() === book.volumeInfo.title.toLowerCase());
                return matchingMovie ? { ...book, movie: matchingMovie } : book;
            });
            const shuffleArray = combined.sort(() => Math.random() - 0.5);
            setCombinedData(shuffleArray);
        }
        console.log(combinedData);
    }, [bookInfo, movieInfo]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <DataContext.Provider value={{ combinedData, loading, error }}>
            {children}
        </DataContext.Provider>
    );
}

export const useDataContext = () => useContext(DataContext);

