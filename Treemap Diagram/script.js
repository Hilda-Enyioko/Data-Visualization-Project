const dropdown = document.getElementById("dropdown");
const treemap = document.getElementById("treemap");
let dropdownValue = "";

const heading = [
    {
        title: "Kickstarter Pledges",
        description: "Top 100 Most Pledged Kickstarter Campaigns Grouped By Category"
    },
    {
        title: "Video Game Sales",
        description: "Top 100 Most Sold Video Games Grouped by Platform"
    },
    {
        title: "Movie Sales",
        description: "Top 100 Highest Grossing Movies Grouped By Genre"
    }
];

dropdown.addEventListener("change", function() {
    dropdownValue = dropdown.value;
    const selectedHeading = heading[dropdownValue];
    document.getElementById("heading").textContent = selectedHeading.title;
    document.getElementById("description").textContent = selectedHeading.description;
    treemap.innerHTML = "";
});