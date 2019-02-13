document.getElementById("submit").addEventListener("click", submitPress);
document.getElementById("delete").addEventListener("click", deletePress);
document.getElementById("update").addEventListener("click", updatePress);


var submitID = document.getElementById("idNum");
var submitName = document.getElementById("name");
var submitPrice = document.getElementById("price");
var submitQuantity = document.getElementById("quantity");
var submitWareId = document.getElementById("wareIdNum");
var submitWareName = document.getElementById("wareName");
var submitAddress = document.getElementById("wareAdd");

var tableNode = document.getElementById("MainList");
var tableTop = document.getElementsByTagName("th");
var idCol = document.getElementById("idCol");
var idNumList = idCol.childNodes;

var newID; //initialize holder variables for return data
var newName;
var newPrice;
var newQuantity;
var newWareID;
var newWareName;
var newAddress;
var row;
var cell1; //initialize holders for new cells
var cell2;
var cell3;
var cell4;
var cell5;
var cell6;
var cell7;
var tableLen = 2; //table starts with two rows

const GETurl = "http://localhost:9595/product/all";
const POSTurl = "http://localhost:9595/product";
const DELETEurl = "http://localhost:9595/product";


function submitPress() {
    if(submitID.value != null){
        console.log("Submit pressed!");//debugging     
        //construct object for post request
        let wareObj = {
            address: submitAddress.value,
            wareID: Number(submitWareId.value),
            wareName: submitWareName.value
        };
        let updateData ={ //builds and stringifies the JSON object
            idnum: Number(submitID.value),
            name: submitName.value,
            price: Number(submitPrice.value),
            quantity: Number(submitQuantity.value),
            warehouse: wareObj
        };
        console.log(updateData);

    //send post request with new data. Be sure to wait unti the response comes before next step
        sendAJAXPost(POSTurl, printPostResponse, updateData); //Send request. How do I wait until it's done?

    //send get request for data to refresh the table
        setTimeout(500); //adds a delay to ensure they don't overlap
        sendAJAXGet(GETurl, printGetResponse)
    }
}

function deletePress(){
    console.log("Delete pressed!"); //debugging
    //send request with data to delete
        let wareObj = {
            address: submitAddress.value,
            wareID: Number(submitWareId.value),
            wareName: submitWareName.value
        };
        let deleteData = { //builds and stringifies the JSON object
            idnum: Number(submitID.value),
            name: submitName.value,
            price: Number(submitPrice.value),
            quantity: Number(submitQuantity.value),
            warehouse: wareObj
        };
        console.log(deleteData);

    sendAJAXDelete(DELETEurl, printDeleteResponse, deleteData);
    //send get request for data to refresh the table
    setTimeout(500); //adds a delay to ensure they don't overlap
    sendAJAXGet(GETurl, printGetResponse);
}


function updatePress(){
    console.log("Update pressed!");//debigging
    //find data from table
    for(i in idCol){
        if(i.innerHTML == submitID.value){
            let deleteID = i.innerHTML;
            let deleteName = i.nextSibling;
            let deletePrice = deleteName.nextSibling;
            let deleteQuantity = deletePrice.nextSibling;
            let deleteWareID = deleteQuantity.nextSibling;
            let deleteWareName = deleteWareID.nextSibling;
            let deleteWareAdd = deleteWareName.nextSibling;
            console.log("deleteWareAdd defined");
            break;
        }
    }
    let wareObjDel = {
        address: deleteWareAdd.innerHTML,
        wareID: Number(deleteWareID.innerHTML),
        wareName: deleteWareName.innerHTML
    };
    let deleteData = { //builds and stringifies the JSON object
        idnum: Number(deleteID),
        name: deleteName.innerHTML,
        price: Number(deletePrice.innerHTML),
        quantity: Number(deleteQuantity.innerHTML),
        warehouse: wareObjDel
    }
    console.log(deleteData);//Debugging
    sendAJAXDelete(DELETEurl, printDeleteResponse, deleteData); //send request with data to delete
        let wareObj = {
            address: submitAddress.value,
            wareID: Number(submitWareId.value),
            wareName: submitWareName.value
        };
        let updateData = JSON.stringify({ //builds and stringifies the JSON object
            idnum: Number(submitID.value),
            name: submitName.value,
            price: Number(submitPrice.value),
            quantity: Number(submitQuantity.value),
            warehouse: wareObj
        });
        console.log(updateData);
    sendAJAXPost(POSTurl, printPostResponse, updateData);
    //send get request for data to refresh the table
    setTimeout(500); //adds a delay to ensure they don't overlap
    sendAJAXGet(GETurl, printGetResponse);
}


function sendAJAXPost(url, callback, data) {//from notes
    let xhr = new XMLHttpRequest();  //Create XHR object
    xhr.open("POST", url, false);//add a "false" as a third input if you want the funtion to run synchronysly.
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {//> 199 && xhr.status < 300) {
            callback(this);
        }

    }
    xhr.setRequestHeader("Content-Type", "application/json"); //Some services will expect specific header properties. This is the most common.
    let newData = JSON.stringify(data); //puts data in JSON format
    xhr.send(newData);//sends data
    console.log("Post Complete");
}

function sendAJAXGet(url, callback) {
    let xhr = new XMLHttpRequest(); // Note that this function only returns the parsed response data. Not the whole xhr.
    xhr.open("GET", url, true); //the "true" refers to whether or not we want the funtion to run asynchronysly.
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            callback(this);
        }
        // xhr.setRequestHeader("Content-Type", "application/json"); //Some services will expect specific header properties. This is the most common.
    }
    xhr.send();
    console.log("get complete");
    // return ans;
}

function sendAJAXDelete(url, callback, data) {//from notes
    let xhr = new XMLHttpRequest();  //Create XHR object
    xhr.open("DELETE", url, false);//add a "false" as a third input if you want the funtion to run synchronysly.
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {//> 199 && xhr.status < 300) {
            callback(this);
        }

    }
    xhr.setRequestHeader("Content-Type", "application/json"); //Some services will expect specific header properties. This is the most common.
    let newData = JSON.stringify(data); //puts data in JSON format
    xhr.send(newData);//sends data
    console.log("Post Complete");
}

let postObject = { //example object for debugging
    id: 44,
    name: "Lid - 6oz Med Rec",
    price: 98.62,
        quantity: 95,
        warehouse: {
        	address: "0565 Brentwood Circle",
            id: 2,
            name: "1347 Property Insurance Holdings, Inc."}

}
// { //JSON version?
//     "id": 44
//     "name": "Lid - 6oz Med Rec"
//     "price": 98.62
//     "quantity": 95
//     "warehouse":
//     .	"address": "0565 Brentwood Circle"
//         "id": 2
//         "name": "1347 Property Insurance Holdings, Inc."
// };
// sendAJAXPost(POSTurl, printPostResponse, postObject);

function printGetResponse(xhrObj) {
    let jsonResponse = xhrObj.response;
    let data = JSON.parse(jsonResponse);
    fillCells(data);
    console.log("Data recieved");
}

function printPostResponse(xhrObj) {
    console.log(xhrObj.response);
}

function printDeleteResponse(xhrObj) {
    console.log(xhrObj.response);
}

function writeCells(data){
    let oldBody = document.getElementsByTagName("tbody")[0]; //Get nodes for old and new table body elements
    let newBody = document.createElement("tbody");
    let cellText = "";
    tableLen = 0;
    for(i in data){
        row = newBody.insertRow(tableLen);
         cellText = "";
        for(j=0;j<7;j++){
            cellText+="<td>" + i[j] + "</td>";
        }
        tableLen++;
        row += cellText;
    }
    oldBody.parentNode.replaceChild(newBody, oldBody);

}

function fillCells(returnData){ //populate table with new data
    //empty table

    // let oldBody = document.getElementsByTagName("tbody")[0]; //Get nodes for old and new table body elements
    // let newBody = document.createElement("tbody");

    tableLen = 0; //reset table length counter
    for (i in returnData) {
        newID = i.id; 
        newName = i.name;
        newPrice = i.price;
        newQuantity = i.quantity;
        newWareID = i.warehouse.id;
        newWareName = i.warehouse.name;
        newAddress = i.warehouse.address;

        row = document.createElement("tr"); //builds new row and cells
        cell1 = document.createElement("td");
        cell2 = document.createElement("td");
        cell3 = document.createElement("td");
        cell4 = document.createElement("td");
        cell5 = document.createElement("td");
        cell6 = document.createElement("td");
        cell7 = document.createElement("td");

        row.appendChild(cell1); //appends elements
        row.appendChild(cell2);
        row.appendChild(cell3);
        row.appendChild(cell4);
        row.appendChild(cell5);
        row.appendChild(cell6);
        row.appendChild(cell7);

        cell1.innerHTML = newID; //populates elements
        cell2.innerHTML = newName;
        cell3.innerHTML = newPrice;
        cell4.innerHTML = newQuantity;
        cell5.innerHTML = newWareID;
        cell6.innerHTML = newWareName;
        cell7.innerHTML = newAddress;

        document.getElementById("MainList").appendChild(row);

        tableLen++; //increment length counter each time a new row is added
    }

    // oldBody = tableNode.replaceChild(newBody, oldBody);
}



{


}