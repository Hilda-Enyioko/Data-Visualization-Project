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
    const padding = 120;
    const mapWidth = mainMap.clientWidth;
    const mapHeight = mainMap.clientHeight;

    const svg = d3.select(mainMap)
        .append('svg')
        .attr('width', mapWidth)
        .attr('height', mapHeight)
        .attr('id', 'svg-map');
    
    const path = d3.geoPath();
    console.log('PATH:', path);


}