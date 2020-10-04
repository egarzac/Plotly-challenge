//Read file
d3.json("./samples.json").then(function(data)  {

//Part of json with required information to graph
    var samples = data.samples;
    console.log(samples);

    var metadata = data.metadata;
    console.log(metadata);

//Metadata with 1st Entry
bringMetadata(samples.slice(0,1));

//BarChart with 1st Menu Entry
buildBarChart(samples.slice(0,1));

//BubbleChart with 1st Menu Entry
buildBubbleChart(samples.slice(0,1));

//Metadata
function bringMetadata(sample) {
  var id = metadata[0].id;
  var ethnicity = metadata[0].ethnicity;
  var gender = metadata[0].gender;
  var age = metadata[0].age;
  var location = metadata[0].location;
  console.log(id, ethnicity, gender, age, location);
}

//Variables for Bar Chart - STATIC
function buildBarChart(sample) {
  var otu_ids = samples[0].otu_ids.slice(0,10).reverse();
  console.log(otu_ids);

  var sample_values = samples[0].sample_values.slice(0,10).reverse();
  console.log(sample_values);

  var labels = samples[0].otu_labels.slice(0,10).reverse();
  console.log(labels);

  //Turn OTU to Strings
  var otu_string = otu_ids.map(x => "OTU" + x.toString());

//Create trace to graph Bar chart
  var trace1 = {
    x: sample_values,
    y: otu_string,
    text: labels,
    name: "Top 10 OTUs",
    type: "bar",
    orientation: "h"
  };


//Bind data to trace1
  var data = [trace1];

//Layout for plot
  var layout = {
    title: "Top 10 OTUs"
  };

//Plot the chart in html "bar" section
  Plotly.newPlot("bar", data, layout);
};


//Bubble Chart
function buildBubbleChart(sample) {
    var otu_idsb = samples[0].otu_ids;
    console.log(otu_idsb);

    var sample_valuesb = samples[0].sample_values;
    console.log(sample_valuesb);

    var labelsb = samples[0].otu_labels;
    console.log(labelsb);

//Trace for Bubble chart - STATIC
    var trace2 = {
      x: otu_idsb,
      y: sample_valuesb,
      text: labelsb,
      mode: "markers",
      marker: {
          size: sample_valuesb,
          color: otu_idsb
        }
      }

//Bind data for plot
    var datab = [trace2];

//Layout for plot
    var layoutb = {
      xaxis: {title: "OTU ID"},
      showlegend: false
    };

    Plotly.newPlot("bubble", datab, layoutb);
};

function buildDropDownMenu(ids) {
//Build dropdownMenu
  var menuID = d3.select("#selDataset");
//Remove previous - just in case
  menuID.html("");

//Append ids from our dataset to dropdownMenu
  ids.forEach(id => {
    var option = d3.select("#selDataset").append("option");
    option.text(id);

  });
}
//Call ID Function for dropdown Menu
buildDropDownMenu(samples.map(x => x.id));

//Update bringMetadata
function updateMetadata(selected) {
  var id = metadata.id;
  var ethnicity = metadata.ethnicity;
  var gender = metadata.gender;
  var age = metadata.age;
  var location = metadata.location;
  console.log(id, ethnicity, gender, age, location);
}

//Update DataChart based on selection
function updateBarChart(selected) {
    var otu_ids = selected[0].otu_ids.slice(0,10).reverse();
    console.log(otu_ids);

    var sample_values = selected[0].sample_values.slice(0,10).reverse();
    console.log(sample_values);

    var labels = selected[0].otu_labels.slice(0,10).reverse();
    console.log(labels);

    var otu_string = otu_ids.map(x => "OTU" + x.toString());

    var newData = {
      x: [sample_values],
      y: [otu_string],
      text: [labels]
      };
    Plotly.restyle("bar", newData);
  };

//Update BubbleChart based on selection
function updateBubbleChart(selected) {
    var otu_idsb = selected[0].otu_ids;
    console.log(otu_idsb)
    var sample_valuesb = selected[0].sample_values;
    console.log(sample_valuesb)
    var labelsb = selected[0].otu_labels;
    console.log(labelsb)

    var newdata = {
      x: [otu_idsb],
      y: [sample_valuesb],
      text: [labelsb],
      marker: {
        size: sample_valuesb,
        color: otu_idsb
        }
      };
      Plotly.restyle("bubble", newdata);
  };

  //Refresh on selection from dropdown Menu
d3.selectAll("#selDataset").on("change", optionChanged);

function optionChanged() {
    //Select dropdown
    var dropdownMenu = d3.select("#selDataset");
    //Select values for Menu
    var menuID = dropdownMenu.property("value");
    console.log(menuID);
    //Assign selected value
    var selected = samples.filter(row => row.id === menuID);
    console.log(selected);

    updateBarChart(selected);
    updateBubbleChart(selected);
    updateMetadata(selected);
  };
});
