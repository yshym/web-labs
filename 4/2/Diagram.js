HTMLElement.prototype.removeChildren = function () {
    while (this.firstChild) {
        this.removeChild(this.firstChild);
    }

    return this;
};

export default class Diagram {
    constructor(data, maxValue, scale) {
        this.data = data;
        this.maxValue = maxValue;
        this.scale = scale;
    }

    initializeInContainer(container) {
        container.removeChildren();

        let diagramTitle = document.createElement("h2");
        diagramTitle.appendChild(document.createTextNode("Діаграма"));

        let diagramDiv = document.createElement("div");
        diagramDiv.classList.add("d-flex");
        diagramDiv.classList.add("flex-row");
        diagramDiv.classList.add("align-items-end");
        diagramDiv.classList.add("justify-content-between");
        diagramDiv.style.height = `${this.maxValue * this.scale + 50}px`;

        this.data.forEach((e) => {
            let nameWrapperDiv = document.createElement("div");
            nameWrapperDiv.classList.add("text-center");

            let colDiv = document.createElement("div");
            colDiv.style.height = `${e.value * this.scale}px`;
            colDiv.style.width = `${
                container.clientWidth / (this.data.length + 0.5)
            }px`;
            colDiv.style.backgroundColor = e.color;
            colDiv.classList.add("d-flex");
            colDiv.classList.add("align-items-center");
            colDiv.classList.add("justify-content-center");

            let valueH1 = document.createElement("h1");
            let valueText = document.createTextNode(e.value);
            valueH1.appendChild(valueText);
            valueH1.hidden = true;

            colDiv.appendChild(valueH1);
            colDiv.onmouseover = () => valueH1.hidden = false;
            colDiv.onmouseout = () => valueH1.hidden = true;

            let nameSpan = document.createElement("span");
            nameSpan.appendChild(document.createTextNode(e.name));

            nameWrapperDiv.appendChild(colDiv);
            nameWrapperDiv.appendChild(nameSpan);

            diagramDiv.appendChild(nameWrapperDiv);
        });

        container.appendChild(diagramTitle);
        container.appendChild(diagramDiv);
    }

    static update(tableElement, container) {
        let tableRows = [].filter.call(
            [].find.call(
                tableElement.children,
                (child) => child.tagName === "TBODY"
            ).children,
            (child) => child.tagName === "TR"
        );

        const colors = [
            "Tomato",
            "Orange",
            "DodgerBlue",
            "MediumSeaGreen",
            "Gray",
            "SlateBlue",
            "Violet",
            "LightGrey",
        ];
        let diagramData = tableRows.map((row, index) => ({
            name: row.dataset.name,
            value: row.dataset.income,
            color: colors[index % colors.length],
        }));

        let diagram = new this(diagramData, 50, 10);
        diagram.initializeInContainer(container);
    }
}
