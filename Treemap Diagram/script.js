window.onload = function() {
    const dropdown = document.getElementById("dropdown");
    const treemap = document.getElementById("tree-map");
    let dropdownValue = "";
    let dataset = [];

    const heading = {
    "default": {
        "title": "Kickstarter Pledges",
        "description": "Top 100 Most Pledged Kickstarter Campaigns Grouped By Category",
        "json": "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/kickstarter-funding-data.json"
    },

    "video": {
        "title": "Video Game Sales",
        "description": "Top 100 Most Sold Video Games Grouped by Platform",
        "json": "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/video-game-sales-data.json"
    },
    
    "movie": {
        "title": "Movie Sales",
        "description": "Top 100 Highest Grossing Movies Grouped By Genre",
        "json": "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/movie-data.json"
    }
};

dropdown.addEventListener("change", function() {
    dropdownValue = dropdown.value;
    console.log(dropdownValue);

    const selectedHeading = heading[dropdownValue];

    document.getElementById("title").textContent = selectedHeading["title"];
    document.getElementById("description").textContent = selectedHeading["description"];

    treemap.innerHTML = ""; // Clear previous content

    d3.select(treemap)
            .transition()
            .duration(1000)
            .style("opacity", 0)
            .style('height', '600px')
            .style('width', '85%')

            //Fade in effect
            .on("end", function() {
                d3.select(this)
                .style("opacity", 1)
                .style('height', 'fit-content')
                .style('width', '95%');

                // Change content after fade out
                document.getElementById("title").textContent = selectedHeading["title"];
                document.getElementById("description").textContent = selectedHeading["description"];

                treemap.innerHTML = `<h2 class="loading-message">Loading ${selectedHeading["title"]} Dataset...</h2>`;

                //clear loading message
                d3.select(this)
                    .transition()
                    .duration(1000)
                    .style("opacity", 0)
                    .style('height', '600px')
                    .style('width', '85%')
        
                    //Fade in effect
                    .on("end", function() {

                        // Fetch new data and draw the treemap
                        fetch(selectedHeading["json"])
                            .then(response => response.json())
                            .then(data => {
                                d3.select(treemap)
                                .style("opacity", 1)
                                .style('height', 'fit-content')
                                .style('width', '95%');
                                treemap.innerHTML = ""; // Clear previous content
                                dataset = data;
                                drawTreemap();
                        });
                    });
            });
});

//svg dimensions
const mapWidth = treemap.clientWidth;
const mapHeight = 500;
const padding = 50;

function drawTreemap() {

    const root = d3.hierarchy(dataset)
                   .sum(d => d.value)
                   .sort((a, b) => b.value - a.value);

    const categories = root.leaves().map(d => d.data.category);
    const uniqueCategories = [...new Set(categories)];

    const colorScale = d3.scaleOrdinal()
                         .domain(uniqueCategories)
                         .range(d3.schemeCategory10);


    const treemapLayout = d3.treemap()
                            .size([mapWidth, mapHeight])
                            .padding(1);
    
    treemapLayout(root);
    
    //svg
    const svgMap = d3.select(treemap)
                     .append('svg')
                     .attr('id', 'svg-map')
                     .attr('width', mapWidth)
                     .attr('height', mapHeight + (2 * padding));               
    
    //tooltip                 
    const toolTip = d3.select(treemap)
                        .append('div')
                        .attr('id', 'tooltip')
                        .style('position', 'absolute')
                        .style('background', '#efefef')
                        .style('padding', '8px')
                        .style('border-radius', '8px')
                        .style('font-size', '11px')
                        .style('color', '#0a0a23')
                        .style('display', 'none')
                        .style('pointer-events', 'none');

    //tiles                    
    const tile = svgMap.selectAll('rect')
                       .data(root.leaves())
                       .enter()
                       .append('rect')
                       .attr('x', d => d.x0)
                       .attr('y', d => d.y0)
                       .attr('width', d => d.x1 - d.x0)
                       .attr('height', d => d.y1 - d.y0)
                       .attr('fill',  d => colorScale(d.data.category))
                       .attr('data-name', d => d.data.name)
                       .attr('data-category', d => d.data.category)
                       .attr('data-value', d => d.data.value)
                       .attr('class', 'tile');
    
    //toogle tooltip on mouseover  and mouseout                 
    tile.on('mouseover', function (event, d) {
        d3.select(this).attr('fill', '#ededff');

        toolTip.style('display', 'block')
                .attr('data-value', d.data.value)
                .html(`Name: ${d.data.name}
                        <hr>
                        Category: ${d.data.category}
                        <hr>
                        Value: ${d.data.value}`)
                .style('left', (event.pageX + 10) + 'px')
                .style('top', (event.pageY + 10) + 'px');
    })
        .on('mouseout', function (event, d) {
            d3.select(this).attr('fill', colorScale(d.data.category));

            toolTip.style('display', 'none');
            if (toolTip.style('display', 'none')) {console.log('tooltip hidden')}
    });
    
    //add tile labels
    svgMap.selectAll('text')
          .data(root.leaves())
          .enter()
          .append('text')
          .text(d => {
            const tileWidth = d.x1 - d.x0;
            const charLimit = Math.floor(tileWidth / 6);
            return d.data.name.length > charLimit
                ? d.data.name.substring(0, charLimit - 1) + '…'
                : d.data.name;
        })
          .attr('x', d => d.x0 + 5)
          .attr('y', d => d.y0 + 15)
          .attr('font-size', '10px')
          .attr('fill', 'black')        
          .attr('class', 'tile-label');

    //add legend      
    const legend = svgMap.append('g')
                     .attr('id', 'legend')
                     .attr('transform', `translate(150, ${mapHeight + padding / 2})`);

    const legendCategories = [...new Set(root.leaves().map(d => d.data.category))];
    console.log(legendCategories);

    const legendItem = legend.selectAll('g')
                             .data(legendCategories)
                             .enter()
                             .append('g')
                             .attr('transform', (d, i) => {
                                console.log(i, d);
                                // Calculate the x and y position based on the index
                                return (`translate(${(i % 4) * 150}, ${Math.floor(i / 4) * 20})`);
                            });
                            
    legendItem.append('rect')
              .attr('height', '12')
              .attr('width', '12')
              .attr('fill', d => colorScale(d))
              .attr('class', 'legend-item');
                            
    legendItem.append('text')
              .text(d => d)
              .attr('x', 20)
              .attr('y', 6)
              .attr('dy', '0.35em')
              .style('font-size', '11px');    

};

    dropdown.value = 'default';
    dropdown.dispatchEvent(new Event('change'));
}