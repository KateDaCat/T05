d3.csv("data/Ex5_TV_energy.csv", d => {

    return {
        brand: d.brand,
        screen_tech: d.screen_tech,
        screensize: +d.screensize,
        energy_consumpt: +d.energy_consumpt,
        star2: +d.star2,
        count: +d.count
    };

}).then(data => {

    console.log(data);

    // Chart dimensions
    const width = 700;
    const height = 450;

    // Create responsive SVG
    const svg = d3.select("#scatter-chart")
        .append("svg")
        .attr("viewBox", `0 0 ${width} ${height}`)
        .attr("width", "100%")
        .attr("height", "100%");


    // X scale: Star Rating
    const xScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.star2)])
        .range([60, 660]);

    // Y scale: Energy Consumption
    const yScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.energy_consumpt)])
        .range([400, 30]);

    console.log(
        "Maximum star rating:",
        d3.max(data, d => d.star2)
    );

    console.log(
        "Maximum energy consumption:",
        d3.max(data, d => d.energy_consumpt)
    );


    // X axis
    svg.append("g")
        .attr("transform", "translate(0, 400)")
        .call(d3.axisBottom(xScale));

    // Y axis
    svg.append("g")
        .attr("transform", "translate(60, 0)")
        .call(d3.axisLeft(yScale));

        // Draw scatter plot points
    svg.selectAll("circle")
        .data(data)
        .join("circle")
        .attr("cx", d => xScale(d.star2))
        .attr("cy", d => yScale(d.energy_consumpt))
        .attr("r", 4)
        .attr("fill", "steelblue")
        .attr("opacity", 0.6);

        // X-axis label
    svg.append("text")
        .attr("x", 360)
        .attr("y", 440)
        .attr("text-anchor", "middle")
        .style("font-family", "sans-serif")
        .style("font-size", "14px")
        .text("Star Rating");

    // Y-axis label
    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", -215)
        .attr("y", 18)
        .attr("text-anchor", "middle")
        .style("font-family", "sans-serif")
        .style("font-size", "14px")
        .text("Energy Consumption (kWh/year)");
});