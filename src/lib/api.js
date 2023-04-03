const UPCOMING_MOVIES_URL =
    "https://api.themoviedb.org/3/movie/upcoming?api_key=2b22c7b9c79499ec85932b7f90626183&language=en-US&page=1";
const MOVIE_DETAILS_URL =
    "https://api.themoviedb.org/3/movie/:movieID?api_key=2b22c7b9c79499ec85932b7f90626183";
const MOVIE_RECOMMENDATIONS_URL =
    "https://api.themoviedb.org/3/movie/:movieID/recommendations?api_key=2b22c7b9c79499ec85932b7f90626183";

export async function getUpcomingMovies() {
    const response = await fetch(UPCOMING_MOVIES_URL);
    const json = await response.json();

    return json;
}

export async function getMovieInfo(id) {
    const response = await fetch(MOVIE_DETAILS_URL.replace(":movieID", id));
    const json = await response.json();

    return json;
}

export async function getMovieRecommendations(id) {
    const response = await fetch(
        MOVIE_RECOMMENDATIONS_URL.replace(":movieID", id)
    );
    const json = await response.json();

    return json;
}
