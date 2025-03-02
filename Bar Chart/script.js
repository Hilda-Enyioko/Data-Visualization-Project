import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

const barChart = document.getElementById('bar-chart');
let dataset = [];

const req = new XMLHttpRequest();
req.open("GET", 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json', true);
req.send();
req.onload = () => {
    const json = JSON.parse(req.responseText);
    dataset = dataset.concat(json.data);
    console.log("JSON: \n", json, "\nDATASET: \n", dataset);
};

const barWidth = 100;
const barHeight = 100;

const svgChart = d3.select(barChart)
                    .append('svg')
                    .attr('width', barWidth => (barWidth + "%"))
                    .attr('height', barHeight => (barHeight + "%"));

svgChart.selectAll('rect')
        .data(dataset)
        .enter()
        .append('rect')
        .attr('height', d => d[1]);