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

    const svg = d3.select(mainMap)
        .append('svg')
        .attr('width', (mapWidth - (2 * padding)))
        .attr('height', (mapHeight - (2 * padding)))
        .attr('id', 'svg-map');
    
    const path = d3.geoPath();

    svg.selectAll('path')
        .data(countyData)
        .enter()
        .append('path')
        .attr('d', path)
        .attr('class', 'county')
        .attr('fill', 'lightgray')
        .attr('stroke', 'white');

}