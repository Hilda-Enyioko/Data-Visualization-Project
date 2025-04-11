import { feature } from "https://cdn.jsdelivr.net/npm/topojson-client@3/+esm";

const mainMap = document.getElementById('main-map');
const topoJSON = "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json";
const educationJSON = "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json";

let educationData = [];
let countyData = [];

Promise.all([
    fetch(topoJSON).then(response => response.json()),
    fetch(educationJSON).then(response => response.json())
])
.then(([countyTopo, education]) => {
    educationData = education;
    countyData = feature(countyTopo, countyTopo.objects.counties).features;
    console.log('EDUCATION DATA:\n', educationData, "\nCOUNTY DATA:\n", countyData);

    plotMap();
})

function plotMap() {
    const padding = 60;
    const mapWidth = mainMap.clientWidth;
    const mapHeight = mainMap.clientHeight;

    const getEducationByFips = (fips) => {
        const data = educationData.find(d => d.fips === fips);
        return data ? data : null;
    }

    const colorScale = d3.scaleQuantize()
    .domain([
        d3.min(educationData, d => d.bachelorsOrHigher),
        d3.max(educationData, d => d.bachelorsOrHigher)
    ])
    .range(d3.schemeBlues[9]);

    const svg = d3.select(mainMap)
        .append('svg')
        .attr('width', mapWidth + (2 * padding))
        .attr('height', mapHeight + (2 * padding))
        .attr('id', 'svg-map')
        .attr('transform', `translate(${padding}, ${padding})`);

    const toolTip = d3.select(mainMap)
                     .append('div')
                     .attr('id', 'tooltip')
                     .style('position', 'absolute')
                     .style('color', '#0a0a23')
                     .style('background-color', '#d0d0d5')
                     .style('padding', '5px')
                     .style('font-size', '11px')
                     .style('border-radius', '5px')
                     .style('opacity', 0)
                     .style('pointer-events', 'none')
                     .style('cursor', 'pointer')
                     .style('transition', 'all 0.5s ease-in-out');
    
    const path = d3.geoPath();

    svg.selectAll('path')
        .data(countyData)
        .enter()
        .append('path')
        .attr('d', path)
        .attr('class', 'county')
        .attr('fill', d => {
            const education = getEducationByFips(d.id);
            return education ? colorScale(education.bachelorsOrHigher) : '#ccc';
        })
        .attr('stroke', 'white')
        .attr('data-fips', d => d.id)
        .attr('data-education', d => {
            const education = getEducationByFips(d.id);
            return education ? education.bachelorsOrHigher : null;
        })
        .on('mouseover', (event, d) => {
            const education = getEducationByFips(d.id);
            toolTip.style('opacity', 1)
                   .style('left', (event.pageX + 10) + 'px')
                   .style('top', (event.pageY - 30) + 'px')
                   .html(`${education.area_name}
                          <hr/>
                          ${education.state}: ${education.bachelorsOrHigher}%`)
                   .attr('data-education', education.bachelorsOrHigher)
        })
        .on('mouseout', () => {
            toolTip.style('opacity', 0);
        });

        const legend = svg.append('g')
                          .attr('id', 'legend')
                          .attr('transform', `translate(${mapWidth / 2}, 20)`);
        
        legend.selectAll('rect')
              .data(colorScale.range())
              .enter()
              .append('rect')
              .attr('x', (d, i) => i * 35)
              .attr('y', 0)
              .attr('width', 35)
              .attr('height', 10)
              .attr('fill', d => d);
        
        legend.selectAll('text')
                .data(colorScale.range())
                .enter()
                .append('text')
                .attr('x', (d, i) => i * 35)
                .attr('y', 20)
                .attr('text-anchor', 'start')
                .style('font-size', '11px')
                .text((d, i) => {
                    const domain = colorScale.invertExtent(d);
                    return `${Math.round(domain[0])}%`;
                });

}