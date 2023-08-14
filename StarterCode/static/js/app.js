// Challenge #14 
// Add url
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Promise Pending
const dataPromise = d3.json(url);
console.log("Data Promise: ", dataPromise);
sample_values = null
sample_ids = null
// Fetch the JSON data and console log it
d3.json(url).then(function(data) {
  // console.log(data);
  sample_values = data.samples.sample_values
  console.log(sample_values);
  sample_ids = data.samples.otu_ids;
  console.log(sample_ids)
  bar_data = create_bar_chart_data(data)
  init(bar_data)
});

d3.selectAll("#selDataset").on("change", getData);
function(data){
  var selectBox = document.getElementById('#selDataset');
  for(var i = 0, l = data.names.length; i < l; i++){
    var option = options[i];
    selectBox.options.add( new Option(option, option, option) );
  }
  
}





function create_bar_chart_data(data){
  let samples = data.samples
  let final_data = {}
  samples.forEach(individual => {
    let id = individual.id
    let otu_val_list = []
    for (var j = 0; j < individual.otu_ids.length; j++) 
      otu_val_list.push({'otu_ids': individual.otu_ids[j], 'sample_values': individual.sample_values[j]});
    


    otu_val_list = otu_val_list.sort((a, b) => b.sample_values - a.sample_values)


    otu_list = []
    samples_list = []
    for (var j = 0; j < otu_val_list.length; j++) {
      otu_list[j] = otu_val_list[j].otu_ids;
      samples_list[j] = otu_val_list[j].sample_values;
    } 
    // let item[id] = {[id]:{otu_ids: otu_list, sample_values:samples_list}}
    final_data[id] = {otu_ids: otu_list, sample_values:samples_list}
  });
  console.log(final_data)

  return final_data
}



  
    // data2 = [{
    //   values: data.sample_values,
    //   labels: data.otu_ids,
    //   type: "bar",
    //   orientation:"h"
    // }];

    // let layout = {
    //   height: 600,
    //   width: 800
    // };

    // Plotly.newPlot("bar", data2, layout);

 


// Create bar plot 
// Display the default plot
function init(bar_data) {
    console.log(bar_data['940'])
    let data = [{
      x: bar_data['940'].sample_values.slice(0.10),
      y: bar_data['940'].otu_ids.slice(0,10),
      type: "bar",
      orientation:"h"
    }];
  
    let layout = {
      height: 600,
      width: 800,
      yaxis: { type: 'category' }
    };
  
    Plotly.newPlot("bar", data, layout);
  }

