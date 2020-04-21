const imagePropsForm = document.getElementById("imagePropsForm");
const image = document.getElementById("landscape");
const widthInput = document.getElementById("widthInput");
const heightInput = document.getElementById("heightInput");
const borderWidthInput = document.getElementById("borderWidthInput");
const borderColorInput = document.getElementById("borderColorInput");
const alternativeTextInput = document.getElementById("alternativeTextInput");

const imagePropsFormInputs = [
    widthInput,
    heightInput,
    borderWidthInput,
    borderColorInput,
    alternativeTextInput,
];

const numberRegex = /\d+/;
const latinLettersRegex = /[A-Za-z]+/;

HTMLInputElement.prototype.isEmpty = function () {
    return this.value === undefined || this.value === null || this.value === "";
};
HTMLInputElement.prototype.matchesPattern = function (regex) {
    return this.value.match(regex);
};
HTMLInputElement.prototype.isNumber = function () {
    return this.value && this.matchesPattern(numberRegex);
};
HTMLInputElement.prototype.validate = function () {
    if (this.isValid && this.isValid()) {
        this.classList.remove("invalid");
        return true;
    } else {
        this.classList.add("invalid");
        return false;
    }
};

widthInput.isValid = function () {
    return this.isNumber();
};
heightInput.isValid = function () {
    return this.isNumber();
};
borderWidthInput.isValid = function () {
    return this.isNumber();
};
borderColorInput.isValid = function () {
    return !this.isEmpty();
};
alternativeTextInput.isValid = function () {
    return !this.isEmpty() && this.matchesPattern(latinLettersRegex);
};

imagePropsFormInputs.every((e) => (e.oninput = () => e.validate()));

imagePropsForm.onsubmit = (e) => {
    e.preventDefault();

    let formData = new FormData(imagePropsForm);

    if (imagePropsFormInputs.map((e) => e.validate()).every((v) => v)) {
        image.width = formData.get("width");
        image.height = formData.get("height");
        image.style.borderWidth = `${formData.get("borderWidth")}px`;
        image.style.borderColor = formData.get("borderColor");
        image.alt = formData.get("alternativeText");
    } else {
        return false;
    }
};
