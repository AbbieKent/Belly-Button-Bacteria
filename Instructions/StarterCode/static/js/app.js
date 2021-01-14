function getData(){
    var selector = d3.select('#selDataset');
    d3.json('data/samples.json').then((data)=>{
        var ids =data.names;
        ids.forEach((id)=>{
            selector.append('option').text(id).property('value', id)
        })
    var firstid= ids[0];
    buildChart(firstid);
    getMetaData(firstid);
// console.log(firstid)

    })
};

function getMetaData(subjectID){
    d3.json('data/samples.json').then((data)=>{
    var names= data.names;
    var metadata= data.metadata;
    var samples = data.samples;
    var findsubject = metadata.filter(d=> d.id== subjectID);
    var result = findsubject[0];
      var metaPanel = d3.select("#sample-metadata");
    //   console.log(result);
    //   console.log(metaPanel);
      metaPanel.html("");
      Object.entries(result).forEach(([key, value]) => {
        metaPanel.append("h6").text(`${key.toUpperCase()}: ${value}`)
        // console.log(samples)
    })
    })
};
function buildChart(sample){
    d3.json('data/samples.json').then((data)=>{
        var samples =data.samples;
        var resultArray = samples.filter(d=> d.id == sample);
        var result = resultArray[0];

        var otu_ids = result.otu_ids;
        var otu_labels = result.otu_labels;
        var sample_values= result.sample_values;

        // console.log(resultArray)
    


//************************************************************************************** */
//HORIZONTAL BART CHART
//************************************************************************************** */

//     //x axis value
//     var sample_values = result.sample_values
//     console.log(sample_values)
//     d3.json('data/samples.json').then((data)=>{
//         var findOTU = samples.filter((d)=> d.id==subjectID);
//         console.log(findOTU)
//     })
//     // .sort((a,b)=>b-a).slice(0,10).reverse();

//     //y values 
        var yaxis = otu_ids.map((d)=> `OTU${d}`).slice(0,10).reverse();
        var xaxis = sample_values.slice(0,10).reverse();
    
    var trace1= {
        x: xaxis,
        y: yaxis,
        type: 'bar',
        orientation: 'h',
        text: otu_labels
    }
var data = [trace1];

var layout = {
    title: "TOP 10 OTUs found",
    xaxis: { title: "Number of OTU" },
    yaxis: { title: "Type of OTU" }
  };
Plotly.newPlot("bar", data, layout);
// //************************************************************************************** */
// //BUBBLE CHART 
// //************************************************************************************** */
let trace2= {
    type: 'scatter',
    x:otu_ids,
    y:sample_values,
    mode: 'markers',
    text: otu_labels,
    marker:{
        size: sample_values,
        color: otu_ids
    }
    
};
let data2= [trace2];
var layout={
    title: "Bacteria Cultures Per sample",
    xaxis: { title: "OTU ID" },
    yaxis: { title: "Type of OTU" }
  };
  Plotly.newPlot("bubble", data2, layout);

// ;
})};

function optionChanged(newSample) {
    // Fetch new data each time a new sample is selected
    getMetaData(newSample);
    buildChart(newSample);
  }
getData();
// getMetaData(sample);
