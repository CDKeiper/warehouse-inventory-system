

const AVGurl = "http://localhost:9595/product/avg";
const SUMurl = "http://localhost:9595/product/sum";
const MINurl = "http://localhost:9595/product/min";
const MAXurl = "http://localhost:9595/product/max";
const MEDurl = "http://localhost:9595/product/median";


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

function printAVGResponse(xhrObj) {
    let jsonResponse = xhrObj.response;
    let data = JSON.parse(jsonResponse);
    document.getElementById("avg").innerHTML = data;
}


sendAJAXGet(AVGurl, printAVGResponse);