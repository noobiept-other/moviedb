import { Lightning, Router } from "@lightningjs/sdk";
import { getMovieInfo } from "../lib/api";

export class Info extends Lightning.Component {
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
                    text: "Loading...",
                    fontSize: 64,
                },
            },
            Logo: {
                x: 960,
                y: 540,
                mount: 0.5,
            },
            Plot: {
                x: 960,
                y: 950,
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
        };
    }

    async loadMovieInfo(id) {
        const info = await getMovieInfo(id);
        console.log(info);

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

    _disable() {
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
    }

    _handleBack() {
        Router.navigate("home");
    }
}
