// Challenge #14 
// Add url
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Promise Pending
const dataPromise = d3.json(url);
console.log("Data Promise: ", dataPromise);
sample_values = null
sample_ids = null
final_data = null

// Fetch the JSON data and console log it
d3.json(url).then(function(data) {
  // console.log(data);
  sample_values = data.samples.sample_values
  sample_ids = data.samples.otu_ids;
  final_data = create_bar_chart_data(data)
  add_ids_dropdown(data)
  create_bar_graph(final_data,'940')
  create_bubble_graph(final_data,'940')
});

// d3.selectAll("#selDataset").on("change", getData);

function optionChanged(id){
  // let dropdownMenu = d3.select("#selDataset");
  // Assign the value of the dropdown menu option to a letiable
  // let id = dropdownMenu.property("value");
  create_bar_graph(final_data, id)
  create_bubble_graph(final_data,id)

}



function add_ids_dropdown(data){
  var selectBox = document.getElementById('selDataset');
  for(var i = 0, l = data.names.length; i < l; i++){
    let option = document.createElement("option")
    option.value = data.names[i]
    option.text = data.names[i]
    selectBox.appendChild(option)
  } 
}

function create_bar_chart_data(data){
  let samples = data.samples
  let final_data = {}
  samples.forEach(individual => {
    let id = individual.id
    let otu_val_list = []
    for (var j = 0; j < individual.otu_ids.length; j++) 
      otu_val_list.push({'otu_ids': individual.otu_ids[j], 'sample_values': individual.sample_values[j], 'otu_labels': individual.otu_labels[j]});
    

    //sort the data
    otu_val_list = otu_val_list.sort((a, b) => b.sample_values - a.sample_values)

    otu_list = []
    samples_list = []
    otu_labels_list = []
    for (var j = 0; j < otu_val_list.length; j++) {
      otu_list[j] = otu_val_list[j].otu_ids;
      samples_list[j] = otu_val_list[j].sample_values;
      otu_labels_list[j] = otu_val_list[j].otu_labels;
    } 
    
    final_data[id] = {otu_ids: otu_list, sample_values:samples_list, otu_labels: otu_labels_list}
  });
  console.log(final_data)

  return final_data
}


 


// Create bar plot 
// Display the default plot
function create_bar_graph(bar_data,id) {
    console.log(bar_data[id])
    let data = [{
      x: bar_data[id].sample_values.slice(0,10),
      y: bar_data[id].otu_ids.slice(0,10),
      type: "bar",
      orientation:"h",
      text: bar_data[id].otu_labels.slice(0,10)
      // labels: bar_data[id].otu_labels.slice(0,10)
    }];
  
    let layout = {
      height: 600,
      width: 800,
      yaxis: { type: 'category' }
    };
  
    Plotly.newPlot("bar", data, layout);
  }

  function create_bubble_graph(final_data,id) {
    console.log(final_data[id])
    let data = [{
      
      x: final_data[id].otu_ids,
      y: final_data[id].sample_values,
      mode: "markers",
      text: final_data[id].otu_labels,
      marker: {
        size: final_data[id].sample_values,
        color: final_data[id].otu_ids
      }

    }];
  
    let layout = {
      height: 600,
      width: 800,
      // xaxis: { type: 'category' }
    };
  
    Plotly.newPlot("bubble", data, layout);
  }

