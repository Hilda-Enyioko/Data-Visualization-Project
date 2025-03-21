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

function plotMap() {

    const padding = 40;
    const width = (1.5 * heatMap.clientWidth);
    const height = heatMap.clientWidth;

    const svgMap = heatMap.append('svg')
                          .attr('width', width)
                          .attr('height', height)
                          .attr('id', 'svg-map');
    
    svgMap.selectAll('rect')
          .data(dataset)
          .enter()
          .append('rect');

}