import { Lightning } from "@lightningjs/sdk";

export class Movie extends Lightning.Component {
    static _template() {
        return {
            w: 200,
            h: 200,
            Title: {
                text: {
                    text: this.bindProp("title"),
                },
            },
            Logo: {
                src: this.bindProp("logo"),
            },
        };
    }
}
