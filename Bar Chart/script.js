import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

const barChart = document.getElementById('bar-chart');
let values = [];

const req = new XMLHttpRequest();
req.open("GET", 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json', true);
req.send();
req.onload = () => {
    const json = JSON.parse(req.responseText);
    values = values.concat(json.data);
    console.log("JSON: \n", json, "\nVALUES: \n", values);
};