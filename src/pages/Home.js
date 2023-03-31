import { Lightning } from "@lightningjs/sdk";
import { getUpcomingMovies } from "../lib/api";
import { Movie } from "../components/Movie";

export class Home extends Lightning.Component {
    static _template() {
        return {
            Background: {
                rect: true,
                w: 1920,
                h: 1080,
                color: 0xff808080,
            },
            Title: {
                text: {
                    text: "Upcoming Movies",
                },
            },
            Movies: {
                x: 960,
                y: 540,
                mount: 0.5,
                w: 1920,
                flex: {
                    direction: "row",
                    wrap: true,
                    alignContent: "center",
                    justifyContent: "space-evenly",
                },
            },
        };
    }

    async _init() {
        const data = await getUpcomingMovies();

        const elements = data.results.map((el) => ({
            type: Movie,
            title: el.title,
            logo: `https://image.tmdb.org/t/p/w500${el.poster_path}`,
        }));

        const movies = this.tag("Movies");
        movies.patch({
            children: [...movies.children, ...elements],
        });
    }
}
