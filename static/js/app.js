// from data.js
const tableData = data;

// get table references
var tbody = d3.select("tbody");

function buildTable(data) {
  // First, clear out any existing data
  tbody.html("");

  // Next, loop through each object in the data
  // and append a row and cells for each value in the row
  data.forEach((dataRow) => {
    // Append a row to the table body
    let row = tbody.append("tr");

    // Loop through each field in the dataRow and add
    // each value as a table cell (td)
    Object.values(dataRow).forEach((val) => {
      let cell = row.append("td");
      cell.text(val);
    });
  });
}

// 1. Create a variable to keep track of all the filters as an object.
const filters = {}

// 3. Use this function to update the filters. 
function updateFilters() {

    //console.log('test');
    // 4a. Save the element that was changed as a variable.
    let elem = d3.select(this);

    // 4b. Save the value that was changed as a variable.
    let inputValue = elem.property("value");

    // 4c. Save the id of the filter that was changed as a variable.
    let elemID = elem.property("id");

    // 5. If a filter value was entered then add that filterId and value
    // to the filters list. Otherwise, clear that filter from the filters object.
    if (inputValue.length > 0) {
      filters[elemID] = inputValue;
    } else {
      delete filters[elemID];
    };

    // 6. Call function to apply all filters and rebuild the table
    filterTable();
  
  }
  
  // 7. Use this function to filter the table when data is entered.
  function filterTable() {
  
    // 8. Set the filtered data to the tableData.
    let filteredData = tableData;
  
    // 9. Loop through all of the filters and keep any data that
    // matches the filter values
    // console.log(Object.keys(filters).length);

    let filterKeys = Object.keys(filters);    
    for (i = 0; i < filterKeys.length; i++) {
      let filterKey = filterKeys[i];
      let filterVal = filters[filterKey];
      // Downside of approach: requires full word.
      filteredData = filteredData.filter(row => row[filterKey] === filterVal);
    };

    console.log(filteredData);

    // 10. Finally, rebuild the table using the filtered data
    buildTable(filteredData);

  };
  
  // 2. Attach an event to listen for changes to each filter
  // orig: d3.selectAll("#filter-btn").on("click", handleClick);
  // d3.select("#filter-input").on("keydown", updateFilters);
  d3.select("#datetime").on("keyup", updateFilters);
  d3.select("#city").on("keyup", updateFilters);
  d3.select("#state").on("keyup", updateFilters);
  d3.select("#country").on("keyup", updateFilters);
  d3.select("#shape").on("keyup", updateFilters);


  // Build the table when the page loads
  buildTable(tableData);
