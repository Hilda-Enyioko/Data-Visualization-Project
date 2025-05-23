import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

const barChart = document.getElementById('bar-chart');
let dataset = [];

const req = new XMLHttpRequest();
req.open("GET", 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json', true);

req.send();

req.onload = () => {
    const json = JSON.parse(req.responseText);
    dataset = json.data;
    console.log("DATASET: \n", dataset);

    drawBarChart();
};


function drawBarChart() {
        const padding = 35;
        const height = 450;

        const containerWidth = barChart.clientWidth;
        const width = containerWidth - (2 * padding);
        const barWidth = width / dataset.length;
    

        const xScale = d3.scaleTime()
                     .domain([new Date(dataset[0][0]), new Date(dataset[dataset.length - 1][0])])
                     .range([padding, width]);

        const yScale = d3.scaleLinear()
                     .domain([0, d3.max(dataset, d => d[1])])
                     .range([height - padding, padding]);

        const maxGDP = d3.max(dataset, d => d[1]);

const svgChart = d3.select(barChart)
                    .append('svg')
                    .attr('width', width)
                    .attr('height', height)
                    .attr('class', 'svg-chart');

const toolTip = d3.select(barChart)
                  .append('div')
                  .attr('id', 'tooltip')
                  .style('position', 'absolute')
                  .style("color", "#000")
                  .style('background', '#fff')
                  .style("padding", "8px")
                  .style("border-radius", "5px")
                  .style("display", "none")
                  .style("pointer-events", "none");

svgChart.selectAll('rect')
        .data(dataset)
        .enter()
        .append('rect')
        .attr('height', d => height - padding - yScale(d[1]))
        .attr('width', barWidth)
        .attr('class', 'bar')
        .attr('data-date', d => d[0])
        .attr('data-gdp', d => d[1])
        .attr('x', d => xScale(new Date(d[0])) - barWidth / 2)
        .attr('y', d => yScale(d[1]))
        .attr('fill', '#000080')
        // implement tooltip
        .on('mouseover', (event, d) => {
                toolTip.style('display', 'block')
                        .html(`Date: ${d[0]}
                                <hr>
                                GDP: $${d[1]}Billion
                        `)
                        .style('left', `${event.pageX + 10}px`)
                        .style('top', `${event.pageY - 30}px`);
                
                toolTip.attr('data-date', d[0]);
        })
        .on('mouseout', () => {
                toolTip.style('display', 'none');
        })


const xAxis = d3.axisBottom(xScale)
                .ticks(15)
                .tickFormat(d3.timeFormat("%Y"));

const yAxis = d3.axisLeft(yScale)
                .ticks(10)
                .tickValues(d3.range(0, maxGDP, 2000))
                .tickFormat(d3.format("d"));
                
        
svgChart.append('g')
        .attr("transform", `translate(0, ${height - padding})`)
        .call(xAxis)
        .attr('id', 'x-axis');
        
svgChart.append("g")
        .attr("transform", `translate(${padding}, 0)`)
        .call(yAxis)
        .attr('id', 'y-axis');

}