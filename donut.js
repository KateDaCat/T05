d3.csv("data/Ex5_TV_energy_Allsizes_byScreenType.csv", d => {

    return {
        screenTech: d.Screen_Tech,
        energy: +d["Mean(Labelled energy consumption (kWh/year))"]
    };

}).then(data => {

    console.log("Donut chart data:", data);

    // Chart dimensions
    const width = 500;
    const height = 400;

    const svg = d3.select("#donut-chart")
        .append("svg")
        .attr("viewBox", `0 0 ${width} ${height}`)
        .attr("width", "100%")
        .attr("height", "100%");

    // Create pie layout
    const pie = d3.pie()
        .value(d => d.energy);

    const pieData = pie(data);

    console.log("Pie data:", pieData);

    // Create donut arc
    const arc = d3.arc()
        .innerRadius(80)
        .outerRadius(150);

    // Centre the donut
    const chartGroup = svg.append("g")
        .attr("transform", `translate(${width / 2}, ${height / 2})`);

    chartGroup
    .selectAll("path")
    .data(pieData)
    .join("path")
    .attr("d", arc)
    .attr("fill", (d, i) => d3.schemeTableau10[i]);

    // Create legend
    const legend = svg.append("g")
        .attr("transform", "translate(20, 20)");

    const legendItems = legend
        .selectAll("g")
        .data(data)
        .join("g")
        .attr("transform", (d, i) => `translate(0, ${i * 25})`);

    // Legend colour boxes
    legendItems.append("rect")
        .attr("width", 15)
        .attr("height", 15)
        .attr("fill", (d, i) => d3.schemeTableau10[i]);

    // Legend text
    legendItems.append("text")
        .attr("x", 22)
        .attr("y", 12)
        .style("font-family", "sans-serif")
        .style("font-size", "13px")
        .text(d => `${d.screenTech}: ${d.energy.toFixed(1)} kWh/year`);
});