
var table;
var countySel;
var ageGroupSel;
var counties = [];

function redoFilter() {
  table.clearFilter();
  if (countySel.value) {
    table.addFilter("county", "=", countySel.value);
  }
  if (ageGroupSel.value) {
    table.addFilter("agegroup", "=", ageGroupSel.value);
  }
}

function parsingDone(results, file) {
//  console.log("Parsing complete:", results, file);
  fileData = _.map(results.data.slice(1), function (row) {
    counties.push(row[4]);
    return {location_type: row[0],
            visit_index: row[1],
            agegroup: row[2],
            state: row[3],
            county: row[4]
           };
  });

  counties = _.uniq(counties).sort();

  table = new Tabulator("#example-table", {
    data:fileData,
    columns:[
      {title:"Location Type", field:"location_type"},
      {title:"% of Usual Visits", field:"visit_index"},
      {title:"Age Group", field:"agegroup"},
      {title:"County", field:"county"},
      {title:"State", field:"state"},
    ],
    height:"400px",
    initialSort:[
      {column:"visit_index", dir:"desc"}
    ],
//    pagination: "local",
  });

  countySel = document.getElementById('county-select');
  _.each(counties, function(county) {
    var option1 = document.createElement("option");
    option1.value = county;
    option1.text = county;
    countySel.add(option1);
  });

  ageGroupSel = document.getElementById('agegroup-select');
  option1 = document.createElement("option");
  option1.value = "Over 65";
  option1.text = "Over 65";
  ageGroupSel.add(option1);
  option1 = document.createElement("option");
  option1.value = "Under 65";
  option1.text = "Under 65";
  ageGroupSel.add(option1);


  countySel.addEventListener('change', redoFilter);
  ageGroupSel.addEventListener('change', redoFilter);
}

Papa.parse('visitsFake.csv', {download: true, complete: parsingDone});
