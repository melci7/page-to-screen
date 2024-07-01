
export async function fetchBookData(apiKey, startIndex = 0, accumulatedBooks = []) {
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
        return fetchBookData(apiKey, startIndex + 40, accumulatedBooks);
    } else {
        return accumulatedBooks;
    }
};

export async function fetchMovieData(options, pageIndex = 1, accumulatedMovies = []) {
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
        return fetchMovieData(options, pageIndex + 1, accumulatedMovies);
    } else {
        return accumulatedMovies;
    }
};
