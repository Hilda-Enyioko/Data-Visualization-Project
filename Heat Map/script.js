const heatMap = document.getElementById('heat-map');

let dataset = [];
let baseTemp = "";

const req = new XMLHttpRequest();

req.open("GET", 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json', true);
req.send();

req.onload = () => {
    const json = JSON.parse(req.responseText);
    dataset = json.monthlyVariance;
    baseTemp = parseFloat(json.baseTemperature);
    console.log('DATASET:\n', dataset, "\nBase Temperature:\n", baseTemp);

    plotMap();
}

function plotMap() {

    const padding = 40;
    const width = (1.8 * heatMap.clientWidth);
    const height = heatMap.clientWidth;

    const minYear = d3.min(dataset, d => d.year);
    const maxYear = d3.max(dataset, d => d.year);

    const minMonth = d3.min(dataset, d => d.month);
    const maxMonth = d3.max(dataset, d => d.month);

    const cellWidth = (width - (2 * padding)) / (maxYear - minYear + 1);
    const cellHeight = (height - padding) / (maxMonth - minMonth + 1);

    //x-dcale for years
    const xScale = d3.scaleLinear()
                     .domain([minYear, maxYear])
                     .range([padding, width - padding]);
    
    // y-scale for months
    const yScale = d3.scaleBand()
                     .domain(d3.range(12))
                     .range([padding, height - padding]);

    // color scale for temperature
    const colorScale = d3.scaleSequential(d3.interpolateRdYlB())
                         .domain([d3.max(dataset, d => d.variance + baseTemp), d3.min(dataset, d => d.variance + baseTemp)]);

    const svgMap = d3.select(heatMap)
                     .append('svg')
                     .attr('width', width)
                     .attr('height', height)
                     .attr('id', 'svg-map');
    
    svgMap.selectAll('rect')
          .data(dataset)
          .enter()
          .append('rect')
          .attr('class', 'cell')
          .attr('width', cellWidth)
          .attr('height', cellHeight)
          .attr('x', d => xScale(d.year))
          .attr('y', d => yScale(d.month - 1))
          .attr('data-month', d => d.month)
          .attr('data-year', d => d.year)
          .attr('data-temp', d => (d.variance + baseTemp).toFixed(2))
          .attr('fill', d => colorScale(baseTemp + d.variance));
    

}