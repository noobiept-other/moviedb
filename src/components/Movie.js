import { Lightning, Utils } from "@lightningjs/sdk";

export class Movie extends Lightning.Component {
    static _template() {
        return {
            w: 400,
            h: 400,

            Logo: {
                src: this.bindProp("logo"),
            },
            Favourite: {
                x: 290,
                y: 10,
                w: 50,
                h: 50,
                mount: 0.5,
                visible: false,
                src: Utils.asset("images/favourite.png"),
            },
        };
    }

    _focus() {
        this.patch({
            smooth: {
                scale: 1.5,
            },
        });
    }

    _unfocus() {
        this.patch({
            smooth: {
                scale: 1,
            },
        });
    }
}
