import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

const heatMap = document.getElementById('heat-map');

let dataset = [];

const req = new XMLHttpRequest();

req.open("GET", 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json', true);
req.send();

req.onload = () => {
    dataset = JSON.parse(req.responseText);
    console.log('DATASET:\n', dataset);

    plotMap();
}

plotMap() {

}