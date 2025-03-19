import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

const scatterPlot = document.getElementById('scatter-plot');

let dataset = [];

const req = new XMLHttpRequest();

req.open("GET", 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json', true);
req.send();

req.onload = () => {
    dataset = JSON.parse(req.responseText);
    console.log('DATASET:\n', dataset);

    plotGraph();
}

function plotGraph() {
    
    const padding = 25;
    const width = scatterPlot.clientWidth;
    const height = scatterPlot.clientHeight || 500;

    const parseTime = (timeString) => {
        const [min, sec] = timeString.split(':').map(Number);
        return (new Date(Date.UTC(1970, 0, 1, 0, min, sec)));
    }

    const xScale = d3.scaleLinear()
                     .domain([d3.min(dataset, d => d['Year']), d3.max(dataset, d => d['Year'])])
                     .range([0, width]);

    const yScale = d3.scaleTime()
                     .domain([
                        d3.min(dataset, d => parseTime(d['Time'])),
                        d3.max(dataset, d => parseTime(d['Time'])),
                     ])
                     .range([height - padding, padding]);

    console.log (
        'Width:', width, '\n',
        'Height:', height, '\n',
        'Min-Year', d3.min(dataset, d => d['Year']), '\n',
        'Max-Year:', d3.max(dataset, d => d['Year']), '\n',
        'Min-Time:', d3.min(dataset, d => parseTime(d['Time'])), '\n',
        'Max-Time:', d3.max(dataset, d => parseTime(d['Time'])), '\n'
    );

    const svgGraph = d3.select(scatterPlot)
                       .append('svg')
                       .attr('width', width)
                       .attr('height', height)
                       .attr('id', 'svg-graph');
    
    svgGraph.selectAll('circle')
            .data(dataset)
            .enter()
            .append('circle')
            .attr('cx', d => d['Year'])
            .attr('cy', d => height - padding - yScale(parseTime(d['Time'])))
            .attr('r', 5)
            .attr('class', 'dot')
            .attr('fill', d => d.Doping ? 'red' : '#1b1b32');


}