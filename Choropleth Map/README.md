# Choropleth Map Project

## Overview
This project is a choropleth map that visualizes U.S. education data, fulfilling the requirements outlined by the [FreeCodeCamp Data Visualization Certification](https://www.freecodecamp.org/learn/data-visualization/data-visualization-projects/visualize-data-with-a-choropleth-map). The map displays the percentage of adults aged 25 and older who have earned a bachelor's degree or higher, categorized by county.

## Features
- 📍 **Choropleth Map:** A visual representation of U.S. counties colored based on education levels.
- 🎨 **Color Scale:** At least four different fill colors to represent different education levels.
- 🏷 **Tooltip:** Displays county name, state, and education percentage when hovering over a county.
- 📊 **Legend:** A key explaining the different colors representing education levels.

## User Stories Fulfilled
1. The map includes a title with `id="title"`.
2. A description is present with `id="description"`.
3. Each county is represented as an SVG path with `class="county"`.
4. At least four different fill colors are used for counties.
5. Each county has `data-fips` and `data-education` attributes.
6. The number of counties matches the provided dataset.
7. The `data-fips` and `data-education` values correspond to the dataset.
8. The map includes a legend with `id="legend"`.
9. The legend contains at least four different colors.
10. A tooltip with `id="tooltip"` appears when hovering over a county.
11. The tooltip displays `data-education` corresponding to the active county.

## Technologies Used
- **HTML**
- **CSS**
- **JavaScript**
- **D3.js** (for SVG-based visualization)

## Datasets Used
- [Dataset: U.S. Education Data](https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json)
- [TopoJSON: U.S. County Data](https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json)

## Testing
You can test the project using FreeCodeCamp's test suite by including the following CDN in your HTML file:
```html
<script src="https://cdn.freecodecamp.org/testable-projects-fcc/v1/bundle.js"></script>
```

## Live Demo
You can view the working project [here](https://fcc-us-educational-attainment.netlify.app/).