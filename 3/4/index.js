const arr = [
    { value: 100, type: "USD" },
    { value: 215, type: "EUR" },
    { value: 7, type: "EUR" },
    { value: 99, type: "USD" },
    { value: 354, type: "USD" },
    { value: 12, type: "EUR" },
    { value: 77, type: "USD" },
];

// 1)
let sum = arr.reduce(
    (acc, e) => (e.value < 100 && e.type == "USD" ? acc + e.value : acc),
    0
);

console.log(`1) Sum of USD elements which value is less than 100: ${sum}`);

// 2)
let newArr = arr.reduce(
    (acc, e) =>
        e.type == "EUR"
            ? acc.concat({ value: e.value * 2, type: e.type })
            : acc,
    []
);

console.log(
    `2) Array of all EUR elements with doubled values:\n${JSON.stringify(
        newArr,
        null,
        2
    )}`
);
