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
    const width = scatterPlot.clientWidth || 800;
    const height = scatterPlot.clientHeight || 500;

    const parseTime = (timeString) => {
        const [min, sec] = timeString.split(':').map(Number);
        return (new Date(Date.UTC(1970, 0, 1, 0, min, sec)));
    }

    const xScale = d3.scaleLinear()
                     .domain([d3.min(dataset, d => d['Year']) - 1, d3.max(dataset, d => d['Year']) + 1])
                     .range([padding, width - padding]);

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

    const toolTip = d3.select(scatterPlot)
                      .append('div')
                      .attr('id', 'tooltip')
                      .style('position', 'absolute')
                      .style('color', '#0a0a23')
                      .style('background', '#d0d0d5')
                      .style('border-radius', '8px')
                      .style('padding', '10px')
                      .style('font-size', '11px')
                      .style('display', 'none')
                      .style('pointer-events', 'none')
                      .style('transition', 'all 0.5s ease-in-out');
    
    svgGraph.selectAll('circle')
            .data(dataset)
            .enter()
            .append('circle')
            .attr('cx', d => xScale(d['Year']))
            .attr('cy', d => yScale(parseTime(d['Time'])))
            .attr('r', 5)
            .attr('class', 'dot')
            .attr('fill', d => d.Doping ? 'red' : '#1b1b32')
            .attr('data-xvalue', d => d.Year)
            .attr('data-yvalue', d => parseTime(d['Time']))
            //Add ToolTip
            .on('mouseover', (event, d) => {
                toolTip.style('display', 'block')
                       .html(`${d.Name}: ${d.Nationality}
                              <hr/>
                              Year: ${d.Year}, Time: ${d.Time}
                              <hr/>
                              ${d.Doping}
                        `)
                        .style('left', `${event.pageX + 10}px`)
                        .style('top', `${event.pageY - 30}px`);
                
                toolTip.attr('data-year', d => d.Year);
            })
            .on('mouseout', () => {
                toolTip.style('display', 'none');
            });


    const xAxis = d3.axisBottom(xScale)
                    .ticks(12)
                    .tickFormat(d3.format("d"));
    
    const yAxis = d3.axisLeft(yScale)
                    .ticks(12)
                    .tickFormat(d3.timeFormat("%M:%S"));
    
    svgGraph.append('g')
            .attr("transform", `translate(0, ${height - padding})`)
            .call(xAxis)
            .attr('id', 'x-axis');
                    
    svgGraph.append("g")
            .attr("transform", `translate(2 * padding, 0)`)
            .call(yAxis)
            .attr('id', 'y-axis');
    
    //Add Legend
    const legendData = [
        { label: 'Doping Allegations', 
          color: 'red' 
        },
        { label: 'No Doping Allegations', 
          color: '#1b1b32' 
        }
    ];

    const legend = svgGraph.append('g')
        .attr('id', 'legend')
        .attr('transform', `translate(${width - padding - 150}, ${height - padding - 100})`);

    legend.selectAll('g')
        .data(legendData)
        .enter()
        .append('g')
        .attr('transform', (d, i) => `translate(0, ${i * 20})`)
        .each(function(d) {
            d3.select(this).append('rect')
                .attr('width', 10)
                .attr('height', 10)
                .attr('fill', d.color);

            d3.select(this).append('text')
                .attr('x', 24)
                .attr('y', 4)
                .attr('dy', '0.35em')
                .style('font-size', '12.5px')
                .text(d.label);
        });

}