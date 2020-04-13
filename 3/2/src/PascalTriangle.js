import { combinations } from "./combination";
import { range } from "./range";

export default class PascalTriangle {
    constructor(n) {
        this.rows = range(n).map((x) => combinations(x));
    }

    toString() {
        return this.rows
            .map((row, i) =>
                `|${i}|`.concat(
                    " ".repeat(this.rows.length - i).concat(row.join(" "))
                )
            )
            .join("\n");
    }
}
