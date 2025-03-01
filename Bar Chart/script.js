import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

const barChart = document.getElementById('bar-chart');

fetch('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json')
.then(response => response.json())
.then(data => console.log(data));