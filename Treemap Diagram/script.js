const dropdown = document.getElementById("dropdown");
const treemap = document.getElementById("treemap");
let dropdownValue = "";

const heading = {
    "default": {
        "title": "Kickstarter Pledges",
        "description": "Top 100 Most Pledged Kickstarter Campaigns Grouped By Category"
    },

    "video": {
        "title": "Video Game Sales",
        "description": "Top 100 Most Sold Video Games Grouped by Platform"
    },
    
    "movie": {
        "title": "Movie Sales",
        "description": "Top 100 Highest Grossing Movies Grouped By Genre"
    }
};

dropdown.addEventListener("change", function() {
    dropdownValue = dropdown.value;
    console.log(dropdownValue);

    const selectedHeading = heading[dropdownValue];

    document.getElementById("heading").innerHTML = selectedHeading["title"];
    document.getElementById("description").innerHTML = selectedHeading["description"];

    treemap.innerHTML = "";
});