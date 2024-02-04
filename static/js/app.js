// Define URL
const url = 'https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json';

// Fetch the JSON data and console log it
d3.json(url).then(function(data){
    console.log(data);
}); 

// Create function for referring to each sample dataset
function init(){
    let dropdownMenu = d3.select("#selDataset");
    d3.json(url).then((data) => {
    let names = data.names;
    console.log(names);
        for (id of names){
            dropdownMenu.append("option").attr("value", id).text(id);
        };
    let initial_sample = names[0];
    console.log(initial_sample);
    
    makeBar(initial_sample);
    makeBubble(initial_sample);
    makeDemographics(initial_sample);
    });
};

// Create function for the horizontal bar chart
function makeBar(sample){

    d3.json(url).then((data) => {
        let sample_data = data.samples;
        let results = sample_data.filter(id => id.id == sample);
        let first_sample = results[0];
        console.log(first_sample);
        
        let sample_values = first_sample.sample_values.slice(0,10);
        let otu_ids = first_sample.otu_ids.slice(0,10);
        let otu_labels = first_sample.otu_labels.slice(0,10);
        console.log(sample_values);
        console.log(otu_ids);
        console.log(otu_labels);

        let bar_trace = {
            x: sample_values.reverse(),
            y: otu_ids.map(item => `OTU ${item}`).reverse(),
            text: otu_labels.reverse(),
            type: 'bar',
            orientation: 'h'
        };

        let layout = {title: "Insert Plot Title Here"};
        Plotly.newPlot("bar", [bar_trace], layout);
    });
};

// Create function for the bubble chart
function makeBubble(sample){

    d3.json(url).then((data) => {
        let sample_data = data.samples;
        let results = sample_data.filter(id => id.id == sample);
        let first_sample = results[0];
        console.log(first_sample);
        
        let sample_values = first_sample.sample_values;
        let otu_ids = first_sample.otu_ids;
        let otu_labels = first_sample.otu_labels;
        console.log(sample_values);
        console.log(otu_ids);
        console.log(otu_labels);

        let bubble_trace = {
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: 'markers',
            marker: {
                size: sample_values,
                color: otu_ids,
                colorscale: "Rainbow"
            }
        };

        let layout = {
            title: "Insert Plot Title Here Part 2",
            xaxis: {title: 'Insert X-Axis Here'},
            yaxis: {title: 'Insert Y-Axis Here'}
        };
        Plotly.newPlot("bubble", [bubble_trace], layout);
    });
};

// Create function to display each sample's demographic info
function makeDemographics(sample){

    d3.json(url).then((data) => {
    let demographic_data = data.metadata;
    let results = demographic_data.filter(id => id.id == sample);
    let first_sample = results[0];
    console.log(first_sample);
    d3.select('#sample-metadata').text('');

    Object.entries(first_sample).forEach(([key,value]) => {
        console.log(key,value);
        d3.select('#sample-metadata').append('h3').text(`${key}, ${value}`);
    });
    });
};

// Define the function when the dropdown detects a change
function optionChanged(value){

    console.log(value);
    makeBar(value);
    makeBubble(value);
    makeDemographics(value);
};

init();
