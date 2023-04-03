import { Lightning } from "@lightningjs/sdk";
import { getUpcomingMovies } from "../lib/api";
import { Movie } from "../components/Movie";

export class Home extends Lightning.Component {
    index = 0;

    static _template() {
        return {
            Background: {
                rect: true,
                w: 1920,
                h: 1080,
                color: 0xff808080,
            },
            Title: {
                x: 960,
                y: 100,
                mount: 0.5,
                text: {
                    text: "Upcoming Movies",
                    fontSize: 64,
                },
            },
            Movies: {
                x: 960,
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
        }));

        const movies = this.tag("Movies");
        movies.patch({
            children: [...movies.children, ...elements],
        });
    }

    pageTransition() {
        return "fade";
    }

    _handleLeft() {
        if (this.index <= 0) {
            return;
        }

        this.index--;

        const movies = this.tag("Movies");
        movies.patch({
            smooth: {
                x: [movies.x + 400, { duration: 0.5 }],
            },
        });
    }

    _getFocused() {
        return this.tag("Movies").children[this.index];
    }

    _handleRight() {
        const movies = this.tag("Movies");

        if (this.index >= movies.children.length - 1) {
            return;
        }

        this.index++;

        movies.patch({
            smooth: {
                x: [movies.x - 400, { duration: 0.5 }],
            },
        });
    }
}
