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
        .attr('data.fips', d => d.id)
        .attr('data-education', d => {
            const education = getEducationByFips(d.id);
            return education ? education.bachelorsOrHigher : null;
        });
    
}