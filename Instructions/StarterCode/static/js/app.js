function getData(){
    var selector = d3.select('#selDataset');

    d3.json('data/samples.json').then((data)=>{
        var ids =data.names;
        ids.forEach((id)=>{
            selector.append('option').text(id).property('value', id)
        })
    var firstid= ids[0];

    createChart(firstid)
    })
};

function createChart(subjectID){
    d3.json('data/samples.json').then((data)=>{
    var names= data.names;
    var metadata= data.metadata;
    var samples = data.samples;
    var findsubject = metadata.filter((d)=> d.id== subjectID);
    var result = findsubject[0];
      var metaPanel = d3.select("#sample-metadata");
      console.log(result);
    //   console.log(metaPanel);
      metaPanel.html("");
      Object.entries(result).forEach(([key, value]) => {
        metaPanel.append("h6").text(`${key.toUpperCase()}: ${value}`)
        // console.log(samples)
    })

//************************************************************************************** */
//HORIZONTAL BART CHART
//************************************************************************************** */

    //x axis value
    var sample_values = result.sample_values
    // .sort((a,b)=>b-a).slice(0,10).reverse();

    // var sampleValues = samples[0].sample_values.sort((a,b)=> b-a).slice(0,10).reverse();
    // console.log(sampleValues);
    //y values 
    console.log(result)
    // var otuIDs = result.otuIDs.map((d)=> `OTU ${d}`).slice(0,10).reverse();
    var otuIDs= samples[0].otu_ids.map((d)=> `OTU ${d}`).slice(0,10).reverse();
    // console.log(outIDs)
    var otuLabels= samples[0].otu_labels.slice(0,10).reverse();
    var trace1= {
        x: sample_values,
        y: otuIDs,
        type: 'bar',
        orientation: 'h',
        text: otuLabels
    }
var data = [trace1];

var layout = {
    title: "TOP 10 OTUs found",
    xaxis: { title: "Number of OTU" },
    yaxis: { title: "Type of OTU" }
  };
Plotly.newPlot("bar", data, layout);
//************************************************************************************** */
//BUBBLE CHART 
//************************************************************************************** */

var otuIDs1= samples[0].otu_ids
var sampleValues1= samples[0].sample_values;
var otuLabels1= samples[0].otu_labels;

let trace2= {
    type: 'scatter',
    x:otuIDs1,
    y:sampleValues1,
    mode: 'markers',
    marker:{
        size: sampleValues1,
        color: otuIDs1
    },
    text: otuLabels
};
let data2= [trace2];
var layout={
    title: "Bubble",
    xaxis: { title: "OTU ID" },
    yaxis: { title: "Type of OTU" }
  };
  Plotly.newPlot("bubble", data2, layout);

});
};

function optionChanged(newSample) {
    // Fetch new data each time a new sample is selected
    createChart(newSample)
  }
getData();