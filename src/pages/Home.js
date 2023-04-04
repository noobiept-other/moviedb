import { Lightning, Router, Utils } from "@lightningjs/sdk";
import { getUpcomingMovies } from "../lib/api";
import { Movie } from "../components/Movie";

export class Home extends Lightning.Component {
    index = 0;

    static initialMoviesX = 960 - 200;

    static _template() {
        return {
            Background: {
                rect: true,
                w: 1920,
                h: 1080,
                color: 0xff808080,
                shader: { type: Lightning.shaders.Dithering, graining: 0.3 },
            },
            Title: {
                x: 960,
                y: 100,
                mount: 0.5,
                text: {
                    text: "",
                    fontSize: 64,
                },
            },
            Movies: {
                x: Home.initialMoviesX,
                y: 540,
                mountY: 0.5,
                flex: {
                    direction: "row",
                },
            },
        };
    }

    async _init() {
        const data = await getUpcomingMovies();

        const elements = data.results.map((el) => ({
            type: Movie,
            logo: `https://image.tmdb.org/t/p/w300${el.poster_path}`,
            movieID: el.id,
            title: el.title,
            backdrop: el.backdrop_path,
        }));

        const movies = this.tag("Movies");
        movies.patch({
            children: [...movies.children, ...elements],
        });
    }

    pageTransition() {
        return "fade";
    }

    _handleEnter() {
        const selected = this.tag("Movies").children[this.index];
        Router.navigate(`info/${selected.movieID}`);
    }

    _handleDown() {
        const movie = this.tag("Movies").children[this.index];
        movie.favourite = !Boolean(movie.favourite);

        movie.patch({
            Favourite: {
                visible: movie.favourite,
            },
        });
    }

    _handleLeft() {
        if (this.index <= 0) {
            return;
        }

        this.index--;

        const movies = this.tag("Movies");
        movies.patch({
            smooth: {
                x: [Home.initialMoviesX - this.index * 400, { duration: 0.5 }],
            },
        });
    }

    _getFocused() {
        const movie = this.tag("Movies").children[this.index];
        this.tag("Title").patch({
            text: { text: movie.title },
        });
        this.tag("Background").patch({
            src: `https://image.tmdb.org/t/p/w500${movie.backdrop}`,
        });

        return movie;
    }

    _handleRight() {
        const movies = this.tag("Movies");

        if (this.index >= movies.children.length - 1) {
            return;
        }

        this.index++;

        movies.patch({
            smooth: {
                x: [Home.initialMoviesX - this.index * 400, { duration: 0.5 }],
            },
        });
    }
}
