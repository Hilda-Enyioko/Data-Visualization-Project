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

    const padding = 60;
    const width = (1.8 * heatMap.clientWidth);
    const height = heatMap.clientHeight;

    const minYear = d3.min(dataset, d => d.year);
    const maxYear = d3.max(dataset, d => d.year);

    const minMonth = d3.min(dataset, d => d.month);
    const maxMonth = d3.max(dataset, d => d.month);

    const cellWidth = (width - (2 * padding)) / (maxYear - minYear + 1);
    const cellHeight = (height - (2 * padding)) / 12;

    //x-dcale for years
    const xScale = d3.scaleLinear()
                     .domain([minYear, maxYear])
                     .range([padding, width - padding]);
    
    // y-scale for months
    const yScale = d3.scaleBand()
                     .domain(d3.range(12))
                     .range([padding, height - padding]);

    // color scale for temperature
    const colorScale = d3.scaleSequential(d3.interpolateRdYlBu)
                         .domain([
                            d3.max(dataset, d => d.variance + baseTemp), 
                            d3.min(dataset, d => d.variance + baseTemp)
                        ]);

    const svgMap = d3.select(heatMap)
                     .append('svg')
                     .attr('width', width)
                     .attr('height', height)
                     .attr('id', 'svg-map');

    const toolTip = d3.select(heatMap)
                     .append('div')
                     .attr('id', 'tooltip')
                     .style('position', 'absolute')
                     .style('background', '#d0d0d5')
                     .style('color', '#0a0a23')
                     .style('border-radius', '8px')
                     .style('font-size', '11px')
                     .style('padding', '10px')
                     .style('display', 'none')
                     .style('cursor', 'pointer');
    
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
          .attr('fill', d => colorScale(baseTemp + d.variance))
          .on('mouseover', (event, d) => {
            const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            toolTip.style('display', 'block')
                   .style('left', `${event.pageX + 10}px`)
                   .style('top', `${event.pageY + 10}px`)
                   .html(`${d.year} - ${month[d.month - 1]}
                          <hr>
                          TEMP: ${baseTemp + d.variance}℃
                          <hr>
                          TEMP-VARIANCe: ${d.variance}℃
                        `)
                   .attr('data-year', d => d.year);
          })
          .on('mouseout', () => {
            toolTip.style('display', 'none')
          });

    const xAxis = d3.axisBottom(xScale)
                    .ticks(28)
                    .tickFormat(d3.format('d'));
    
    const yAxis = d3.axisLeft(yScale)
                    .ticks(12)
                    .tickFormat(d => {
                        const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
                        return month[d];
                    });
    
    svgMap.append('g')
          .attr("transform", `translate(0, ${height - padding})`)
          .call(xAxis)
          .attr('id', 'x-axis');
            
    svgMap.append("g")
          .attr("transform", `translate(${padding}, 0)`)
          .call(yAxis)
          .attr('id', 'y-axis');
    
    svgMap.selectAll('#x-axis text')
          .style('font-size', window.innerWidth < 600 ? '8.5px' : '11px')
          .style("text-anchor", window.innerWidth < 600 ? "end" : "middle")
          .attr("dx", window.innerWidth < 600 ? "-5px" : "0")
          .attr("dy", window.innerWidth < 600 ? "5px" : "0")
          .attr("transform", window.innerWidth < 600 ? "rotate(-20)" : "none");

}