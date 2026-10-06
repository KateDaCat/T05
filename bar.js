d3.csv(
    "data/Ex5_TV_energy_55inchtv_byScreenType.csv",
    d => {
        return {
            screenTech: d["Screen_Tech"],
            energy: +d["Mean(Labelled energy consumption (kWh/year))"]
        };
    }
).then(data => {

    console.log("Bar chart data:", data);

    const width = 700;
    const height = 450;

    const svg = d3.select("#bar-chart")
        .append("svg")
        .attr("viewBox", `0 0 ${width} ${height}`)
        .attr("width", "100%")
        .attr("height", "100%");

    // X scale: screen technology categories
    const xScale = d3.scaleBand()
        .domain(data.map(d => d.screenTech))
        .range([70, 660])
        .padding(0.25);

    // Y scale: energy consumption
    const yScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.energy)])
        .range([390, 30]);

    // X axis
    svg.append("g")
        .attr("transform", "translate(0, 390)")
        .call(d3.axisBottom(xScale));

    // Y axis
    svg.append("g")
        .attr("transform", "translate(70, 0)")
        .call(d3.axisLeft(yScale));

    svg.selectAll("rect")
    .data(data)
    .join("rect")
    .attr("x", d => xScale(d.screenTech))
    .attr("y", d => yScale(d.energy))
    .attr("width", xScale.bandwidth())
    .attr("height", d => 390 - yScale(d.energy))
    .attr("fill", "steelblue");

    // X-axis label
    svg.append("text")
        .attr("x", 365)
        .attr("y", 440)
        .attr("text-anchor", "middle")
        .style("font-family", "sans-serif")
        .style("font-size", "14px")
        .text("Screen Technology");

    // Y-axis label
    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", -210)
        .attr("y", 20)
        .attr("text-anchor", "middle")
        .style("font-family", "sans-serif")
        .style("font-size", "14px")
        .text("Energy Consumption (kWh/year)");
});