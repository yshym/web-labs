import Enterprise from "./Enterprise.js";

const tableElement = document.getElementById("enterprises");
const enterpriseAddButton = document.getElementById("enterpriseAdd");

enterpriseAddButton.onclick = () => {
    if (tableElement.hidden) {
        tableElement.hidden = false;
    }
    Enterprise.addToTable(tableElement);
};
