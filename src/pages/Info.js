import { Lightning, Router } from "@lightningjs/sdk";
import { getMovieInfo, getMovieRecommendations } from "../lib/api";

export class Info extends Lightning.Component {
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
                y: 50,
                mount: 0.5,
                text: {
                    text: "Loading...",
                    fontSize: 64,
                },
            },
            Logo: {
                x: 960,
                y: 400,
                mount: 0.5,
            },
            Plot: {
                x: 960,
                y: 780,
                w: 1800,
                mount: 0.5,
                text: {
                    text: "",
                },
            },
            ReleaseDate: {
                x: 10,
                y: 10,
                text: {
                    text: "",
                },
            },
            Recommendations: {
                x: 960,
                y: 970,
                w: 1200,
                mount: 0.5,
                flex: {
                    direction: "row",
                    justifyContent: "space-around",
                },
            },
        };
    }

    async loadMovieInfo(id) {
        const info = await getMovieInfo(id);

        this.tag("Background").patch({
            src: `https://image.tmdb.org/t/p/w500${info.backdrop_path}`,
        });
        this.tag("Title").patch({
            text: {
                text: info.title,
            },
        });
        this.tag("Logo").patch({
            src: `https://image.tmdb.org/t/p/w400${info.poster_path}`,
        });
        this.tag("Plot").patch({
            text: {
                text: info.overview,
            },
        });
        this.tag("ReleaseDate").patch({
            text: {
                text: info.release_date,
            },
        });
    }

    async loadMovieRecommendations(id) {
        const info = await getMovieRecommendations(id);

        this.tag("Recommendations").patch({
            children: info.results.slice(0, 8).map((el) => ({
                src: `https://image.tmdb.org/t/p/w200${el.poster_path}`,
                w: 120,
                h: 180,
            })),
        });
    }

    _disable() {
        this.tag("Background").patch({
            src: undefined,
        });
        this.tag("Title").patch({
            text: {
                text: "Loading...",
            },
        });
        this.tag("Logo").patch({
            src: undefined,
        });
        this.tag("Plot").patch({
            text: {
                text: "",
            },
        });
        this.tag("ReleaseDate").patch({
            text: {
                text: "",
            },
        });
    }

    set params(args) {
        this.loadMovieInfo(args.movieID);
        this.loadMovieRecommendations(args.movieID);
    }

    _handleBack() {
        Router.navigate("home");
    }
}
