import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

const scatterPlot = document.getElementById('scatter-plot');

const req = new XMLHttpRequest();

req.open("GET", 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json', true);
req.send

req.onload = () => {
    const json = JSON.parse(req.responseText);
    console.log('JSON:\n', json);

    plotGraph();
}

function plotGraph() {
    
}