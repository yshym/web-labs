import Diagram from "./Diagram.js";

const diagramDiv = document.getElementById("diagram");

export default class Enterprise {
    static addToTable(tableElement) {
        let tableBody = [].find.call(
            tableElement.children,
            (child) => child.tagName === "TBODY"
        );
        let newRow = document.createElement("tr");

        let removeButton = document.createElement("a");
        removeButton.href = "#";
        removeButton.appendChild(document.createTextNode("Видалити"));
        removeButton.onclick = () => {
            tableBody.removeChild(newRow);
            Diagram.update(tableElement, diagramDiv);
        };

        let [removeCell, nameCell, incomeCell] = [...Array(3).keys()].map((_) =>
            document.createElement("td")
        );

        removeCell.classList.add("pl-5");
        removeCell.appendChild(removeButton);

        nameCell.contentEditable = "true";
        nameCell.oninput = () => {
            newRow.dataset.name = nameCell.textContent;
            Diagram.update(tableElement, diagramDiv);
        };

        incomeCell.contentEditable = "true";
        incomeCell.oninput = () => {
            (newRow.dataset.income = incomeCell.textContent);
            Diagram.update(tableElement, diagramDiv);
        };

        newRow.appendChild(removeCell);
        newRow.appendChild(nameCell);
        newRow.appendChild(incomeCell);

        tableBody.appendChild(newRow);
    }
}
