d3.csv("data/Ex5_ARE_Spot_Prices.csv", d => {

    return {
        year: +d["Year"],
        queensland: +d["Queensland ($ per megawatt hour)"],
        nsw: +d["New South Wales ($ per megawatt hour)"],
        victoria: +d["Victoria ($ per megawatt hour)"],
        southAustralia: +d["South Australia ($ per megawatt hour)"]
    };

}).then(data => {

    console.log("Line chart data:", data);

    const width = 700;
    const height = 450;

    const svg = d3.select("#line-chart")
        .append("svg")
        .attr("viewBox", `0 0 ${width} ${height}`)
        .attr("width", "100%")
        .attr("height", "100%");

    // X scale: Year
    const xScale = d3.scaleLinear()
        .domain(d3.extent(data, d => d.year))
        .range([70, 660]);

    // Y scale: Spot price
    const yScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.queensland)])
        .range([390, 30]);

    // X axis
    svg.append("g")
        .attr("transform", "translate(0, 390)")
        .call(
            d3.axisBottom(xScale)
                .tickFormat(d3.format("d"))
        );

    // Y axis
    svg.append("g")
        .attr("transform", "translate(70, 0)")
        .call(d3.axisLeft(yScale));

    // Create line generator for Queensland
    const line = d3.line()
        .x(d => xScale(d.year))
        .y(d => yScale(d.queensland));

    svg.append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", "steelblue")
    .attr("stroke-width", 2)
    .attr("d", line);

    // X-axis label
    svg.append("text")
        .attr("x", 365)
        .attr("y", 440)
        .attr("text-anchor", "middle")
        .style("font-family", "sans-serif")
        .style("font-size", "14px")
        .text("Year");

    // Y-axis label
    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", -210)
        .attr("y", 20)
        .attr("text-anchor", "middle")
        .style("font-family", "sans-serif")
        .style("font-size", "14px")
        .text("Spot Price ($/MWh)");
});