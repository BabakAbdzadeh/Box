
// Print the results using Window Object.

function createPDF(id) {
    const table = document.getElementById(`${id}`);

    const style = document.createElement("style");
    style.textContent = `table {width: 90%;font: 17px Calibri;} 
     table, th, td {border: solid 1px #DDD; border-collapse: collapse; 
     padding: 2px 3px;text-align: center;}`


    // CREATE A WINDOW OBJECT.
    const win = window.open('', '', 'height=700,width=700');
    const doc = win.document;
    const title = document.createElement("title");
    title.textContent = "Profile"
    doc.body.append(title);
    doc.body.append(style);
    doc.body.append(table);
    win.print();


}



export default createPDF;