function getData(){
    d3.json('data/samples.json').then((data)=>{
    var names= data.names;
    var metadata= data.metadata;
    var samples = data.samples;
    // console.log(samples)
//************************************************************************************** */
//HORIZONTAL BART CHART
//************************************************************************************** */

    //x axis value
    var sampleValues = samples[0].sample_values.sort((a,b)=> b-a).slice(0,10).reverse();
    // console.log(sampleValues);
    //y values 
    var otuIDs= samples[0].otu_ids.map((d)=> `OTU ${d}`).slice(0,10).reverse();
    // console.log(outIDs)
    var otuLabels= samples[0].otu_labels.slice(0,10).reverse();
    var trace1= {
        x: sampleValues,
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
getData();