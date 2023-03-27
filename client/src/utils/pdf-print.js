
// Print the results using Window Object.
function createPDF(id) {
    const table = document.getElementById(id);
    // Create a clone of the table to print, so that we don't modify the original.
    const tableClone = table.cloneNode(true);

    const printWindow = window.open("", "", "height=700,width=700");
    const printDocument = printWindow.document;

    const style = document.createElement("style");
    style.textContent =
        "table {width: 90%;font: 17px Calibri;} " +
        "table, th, td {border: solid 1px #DDD; border-collapse: collapse; " +
        "padding: 2px 3px;text-align: center;}";

    const title = document.createElement("title");
    title.textContent = "Table";

    printDocument.head.appendChild(style);
    printDocument.head.appendChild(title);
    printDocument.body.appendChild(tableClone);

    printWindow.print();
}




export default createPDF;