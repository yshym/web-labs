export default class Player {
    constructor(name, sex, country) {
        this.name = name;
        this.sex = sex;
        this.country = country;
    }

    static prompt() {
        return new this(
            prompt("Enter your name"),
            prompt("Enter your sex"),
            prompt("Enter your country")
        );
    }

    enterWishes() {
        this.wishes = {
            town: prompt("What town do you want to live in?"),
            profession: prompt("What profession do you like?"),
        };
    }

    showWishes() {
        for (let key in this.wishes) {
            switch (key) {
                case "town":
                    alert(`You will live in ${this.wishes[key]}`);
                    break;
                case "profession":
                    alert(`You will work as ${this.wishes[key]}`);
                    break;
            }
        }
    }
}
