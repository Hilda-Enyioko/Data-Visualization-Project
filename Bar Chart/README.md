# Bar Chart Visualization  

This project is a **Bar Chart Visualization** built using **D3.js**, fulfilling the requirements of the FreeCodeCamp Data Visualization Certification. It replicates the functionality of [this reference project](https://bar-chart.freecodecamp.rocks) while incorporating a personal design style.  

## 🎯 Objective  

Build an interactive bar chart that meets the following user stories and passes all required tests.  

## 🚀 Live Demo  

[LIVE DEMO](https://d3-usa-gdp-chart.netlify.app/)

## 📊 Features & User Stories  

✅ **Title**: The chart includes a title with `id="title"`.  

✅ **Axes**:  
- The x-axis is represented by a `<g>` element with `id="x-axis"`.  
- The y-axis is represented by a `<g>` element with `id="y-axis"`.  

✅ **Ticks**: Both axes contain multiple tick labels with `class="tick"`, ensuring proper alignment.  

✅ **Bars**:  
- Each data point is represented by a `<rect>` element with `class="bar"`.  
- Bars contain `data-date` and `data-gdp` attributes corresponding to their respective values.  

✅ **Data Representation**:  
- The order of `data-date` and `data-gdp` attributes matches the provided dataset.  
- Bar heights accurately reflect GDP values.  

✅ **Alignment**:  
- The `data-date` attribute aligns with the x-axis.  
- The `data-gdp` attribute aligns with the y-axis.  

✅ **Tooltip**:  
- A tooltip (`id="tooltip"`) appears on hover, displaying relevant data.  
- The tooltip's `data-date` matches the active bar.  

## 🛠️ Technologies Used  

- **D3.js** – For SVG-based data visualization  
- **AJAX/Fetch API** – To retrieve and parse JSON data  
- **HTML, CSS, JavaScript** – For structuring and styling the project  

## 📥 Dataset  

The dataset used in this project is sourced from FreeCodeCamp:  
[GDP Data JSON](https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json)  