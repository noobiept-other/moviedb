const UPCOMING_MOVIES_URL =
    "https://api.themoviedb.org/3/movie/upcoming?api_key=2b22c7b9c79499ec85932b7f90626183&language=en-US&page=1";

export async function getUpcomingMovies() {
    const response = await fetch(UPCOMING_MOVIES_URL);
    const json = await response.json();

    return json;
}

export function getMovieInfo(id) {
    return {
        title: "title",
        poster: "url",
        plot: "plot explained here",
        releaseDate: "1/1/2023",
        similarMovies: [
            {
                title: "title",
                poster: "url",
            },
        ],
    };
}
