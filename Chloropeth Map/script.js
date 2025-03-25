import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

const mainMap = document.getElementById('main-map');
const countyDataUrl = "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json";
const educationDataUrl = "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json";

let dataset = [];