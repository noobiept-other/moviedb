import { Lightning } from "@lightningjs/sdk";

export class Movie extends Lightning.Component {
    static _template() {
        return {
            w: 400,
            h: 400,

            Logo: {
                src: this.bindProp("logo"),
            },
        };
    }

    _focus() {
        this.tag("Logo").patch({
            smooth: {
                scale: 1.5,
            },
        });
    }

    _unfocus() {
        this.tag("Logo").patch({
            smooth: {
                scale: 1,
            },
        });
    }
}
