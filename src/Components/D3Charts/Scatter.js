import * as d3 from 'd3';

export default function Scatter(element, onHover) {
  const margin = { top: 50, bottom: 50, right: 50, left: 50 };
  const height = 500 - margin.top - margin.bottom;
  const width = 500 - margin.left - margin.right;

  //prettier-ignore
  const svg = d3.select(element)
    .append('svg')
    .attr('width', width+margin.left+margin.right)
    .attr('height', height+margin.top+margin.bottom);

  const container = svg
    .append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);

  const xAxis = container
    .append('g')
    .attr('id', 'xAxis')
    .attr('transform', `translate(0,${height})`);

  const yAxis = container.append('g').attr('id', 'yAxis');

  this.update = (data) => {
    const xScale = d3
      .scaleLinear()
      .domain([0, d3.max(data.map((d) => +d.age))])
      .range([0, width]);
    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data.map((d) => +d.height))])
      .range([height, 0]);

    const xAxisFunction = d3.axisBottom(xScale);
    const yAxisFunction = d3.axisLeft(yScale);

    xAxis.transition().duration(1000).call(xAxisFunction);
    yAxis.transition().duration(1000).call(yAxisFunction);

    const dots = container.selectAll('circle').data(data);

    dots.exit().transition().duration(1000).style('opacity', 0).remove();

    dots
      .transition()
      .duration(1000)
      .attr('cx', (d) => xScale(d.age))
      .attr('cy', (d) => yScale(d.height));

    dots
      .enter()
      .append('circle')
      .attr('r', 0)
      .attr('cx', (d) => xScale(d.age))
      .attr('cy', (d) => yScale(d.height))
      .on('mouseover', (e, d) => {
        d3.select(e.target).attr('r', 5);
        onHover(d.name);
      })
      .on('mouseout', (e) => {
        d3.select(e.target).attr('r', 3);
        onHover('');
      })
      .transition()
      .duration(1000)
      .attr('r', 3);
  };
}
