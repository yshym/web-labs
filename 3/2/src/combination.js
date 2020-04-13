import { range } from "./range";
import { factorial } from "./factorial";

export const combination = (n, r) =>
    Math.trunc(factorial(n) / (factorial(r) * factorial(n - r)));

export const combinations = (c) => range(c + 1).map((x) => combination(c, x));
